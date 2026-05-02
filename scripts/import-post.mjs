#!/usr/bin/env node

/**
 * Publish blog posts from Obsidian to the Astro site.
 *
 * Usage:
 *   node scripts/import-post.mjs [options]
 *
 * Modes:
 *   (no args)           Sync all published posts from Obsidian
 *   <path-to-file>      Import a single file
 *
 * Options:
 *   --dry-run           Show what would be done without writing files
 *   --attachments <dir> Attachments folder name (default: "attachments")
 *
 * Obsidian posts are expected at:
 *   ~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Personal/Writing/Blog/
 *
 * A post is considered published when its frontmatter contains "published: true".
 * The publish date and title are derived from the filename: "2026-02-22 My Post Title.md"
 */

import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync, readdirSync, watch } from "fs";
import { resolve, dirname, basename, extname, join } from "path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const BLOG_DIR = join(ROOT, "src/content/blog");
const ASSETS_DIR = join(ROOT, "public/assets");

const OBSIDIAN_BLOG_DIR = resolve(
  process.env.HOME,
  "Library/Mobile Documents/iCloud~md~obsidian/Documents/Personal/Writing/Blog"
);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseArgs(args) {
  const opts = {
    file: null,
    dryRun: false,
    watch: false,
    attachments: "attachments",
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--dry-run") {
      opts.dryRun = true;
    } else if (arg === "--watch") {
      opts.watch = true;
    } else if (arg === "--attachments") {
      opts.attachments = args[++i];
    } else if (!arg.startsWith("--")) {
      opts.file = arg;
    }
  }

  return opts;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: content };

  const frontmatterStr = match[1];
  const body = match[2];

  const data = {};
  let currentKey = null;
  for (const line of frontmatterStr.split("\n")) {
    const arrayItem = line.match(/^\s+-\s+(.+)$/);
    if (arrayItem && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(arrayItem[1].trim());
      continue;
    }

    const kv = line.match(/^(\w[\w-]*)\s*:\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      let val = kv[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (val === "true") val = true;
      else if (val === "false") val = false;
      else if (val === "") val = undefined;
      data[currentKey] = val;
    }
  }

  return { data, body };
}

function serializeFrontmatter(data) {
  let yaml = "---\n";
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      yaml += `${key}:\n`;
      for (const item of value) {
        yaml += `  - ${item}\n`;
      }
    } else if (typeof value === "boolean") {
      yaml += `${key}: ${value}\n`;
    } else if (typeof value === "string" && value.includes(":") && !value.match(/^\d{4}-\d{2}-\d{2}/)) {
      yaml += `${key}: '${value}'\n`;
    } else {
      yaml += `${key}: ${value}\n`;
    }
  }
  yaml += "---\n";
  return yaml;
}

function processWikiLinks(body) {
  // Convert Obsidian wiki-links to standard Markdown links:
  //   [[Post Title]]            → [Post Title](/posts/post-title)
  //   [[Post Title|custom text]] → [custom text](/posts/post-title)
  // Skip image embeds (![[...]]) — those are handled separately.
  return body.replace(/(?<!!)\[\[([^\]]+)\]\]/g, (match, inner) => {
    const parts = inner.split("|");
    const target = parts[0].trim();
    const display = (parts[1] || target).trim();
    // Strip leading date prefix (e.g. "2026-02-22 Building Macaroon" → "Building Macaroon")
    const { title } = parseFilename(target);
    const slug = slugify(title);
    return `[${display}](/posts/${slug})`;
  });
}

function processImages(body, sourceDir, attachmentsFolder) {
  // Convert Obsidian wiki-link embeds: ![[image.png]] or ![[image.png|caption]]
  body = body.replace(/!\[\[([^\]]+)\]\]/g, (match, inner) => {
    const pipeIdx = inner.indexOf("|");
    if (pipeIdx !== -1) {
      const filename = inner.slice(0, pipeIdx).trim();
      const caption = inner.slice(pipeIdx + 1).trim();
      return `![${caption}](${filename})`;
    }
    return `![](${inner})`;
  });

  return body.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, pathAndTitle) => {
    const titleMatch = pathAndTitle.match(/^(.+?)\s+"([^"]*)"$/);
    let imgPath, title;
    if (titleMatch) {
      imgPath = titleMatch[1].trim();
      title = titleMatch[2];
    } else {
      imgPath = pathAndTitle.trim();
      title = null;
    }

    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) return match;
    if (imgPath.startsWith("/assets/")) return match;

    let resolvedPath;
    const directPath = resolve(sourceDir, imgPath);
    const attachmentsPath = resolve(sourceDir, attachmentsFolder, imgPath);

    if (existsSync(directPath)) {
      resolvedPath = directPath;
    } else if (existsSync(attachmentsPath)) {
      resolvedPath = attachmentsPath;
    } else {
      const basenamePath = resolve(sourceDir, attachmentsFolder, basename(imgPath));
      if (existsSync(basenamePath)) {
        resolvedPath = basenamePath;
      } else {
        console.warn(`  Warning: Image not found: ${imgPath}`);
        return match;
      }
    }

    const destFilename = basename(resolvedPath);
    const destPath = join(ASSETS_DIR, destFilename);

    if (!existsSync(destPath)) {
      console.log(`  Copying image: ${destFilename}`);
      copyFileSync(resolvedPath, destPath);
    }

    const newRef = `/assets/${destFilename}`;
    if (alt) {
      return `<figure><img src="${newRef}" alt="${alt}" /><figcaption>${alt}</figcaption></figure>`;
    }
    return title ? `![](${newRef} "${title}")` : `![](${newRef})`;
  });
}

/** Parse "2026-02-22 My Post Title.md" → { date: "2026-02-22", title: "My Post Title" } */
function parseFilename(filename) {
  const name = basename(filename, extname(filename));
  const match = name.match(/^(\d{4}-\d{2}-\d{2})\s+(.+)$/);
  if (match) {
    return { date: match[1], title: match[2] };
  }
  return { date: null, title: name };
}

function importPost(filePath, opts) {
  const raw = readFileSync(filePath, "utf-8");
  const { data, body } = parseFrontmatter(raw);

  const { date, title } = parseFilename(filePath);
  const slug = data.slug || slugify(title);

  const isPublished = data.published === true;

  const frontmatter = {
    title,
    excerpt: data.excerpt || "",
    tags: data.tags || [],
    slug,
  };

  if (isPublished) {
    frontmatter.published = date || new Date().toISOString().slice(0, 10);
  }

  const sourceDir = dirname(filePath);
  const linkedBody = processWikiLinks(body);
  const processedBody = opts.dryRun ? linkedBody : processImages(linkedBody, sourceDir, opts.attachments);

  mkdirSync(BLOG_DIR, { recursive: true });
  mkdirSync(ASSETS_DIR, { recursive: true });

  const outputFilename = `${slug}.md`;
  const outputPath = join(BLOG_DIR, outputFilename);
  const output = serializeFrontmatter(frontmatter) + "\n" + processedBody.trimStart();

  if (opts.dryRun) {
    console.log(`  [dry-run] Would write: src/content/blog/${outputFilename}`);
  } else {
    writeFileSync(outputPath, output, "utf-8");
    console.log(`  Written: src/content/blog/${outputFilename}`);
  }

  return { title: frontmatter.title, slug, published: frontmatter.published || null, isDraft: !isPublished };
}

function syncAll(opts) {
  if (!existsSync(OBSIDIAN_BLOG_DIR)) {
    console.error(`Obsidian blog directory not found: ${OBSIDIAN_BLOG_DIR}`);
    console.error("Is iCloud Drive synced?");
    process.exit(1);
  }

  const files = readdirSync(OBSIDIAN_BLOG_DIR).filter((f) => f.endsWith(".md"));

  if (files.length === 0) {
    console.log("No markdown files found in Obsidian blog folder.");
    return;
  }

  let published = 0;
  let drafts = 0;

  for (const file of files) {
    const filePath = join(OBSIDIAN_BLOG_DIR, file);

    const status = (() => {
      const raw = readFileSync(filePath, "utf-8");
      const { data } = parseFrontmatter(raw);
      return data.published === true ? "published" : "draft";
    })();

    console.log(`\nImporting (${status}): ${file}`);
    const result = importPost(filePath, opts);
    console.log(`  Title: ${result.title}`);
    if (result.published) console.log(`  Date: ${result.published}`);
    status === "published" ? published++ : drafts++;
  }

  console.log(`\nDone. ${published} published, ${drafts} drafts imported.`);
}

function watchObsidian(opts) {
  if (!existsSync(OBSIDIAN_BLOG_DIR)) {
    console.error(`Obsidian blog directory not found: ${OBSIDIAN_BLOG_DIR}`);
    process.exit(1);
  }

  console.log(`Watching: ${OBSIDIAN_BLOG_DIR}`);

  let debounceTimer = null;
  watch(OBSIDIAN_BLOG_DIR, { recursive: true }, (eventType, filename) => {
    if (!filename || !filename.endsWith(".md")) return;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const filePath = join(OBSIDIAN_BLOG_DIR, filename);
      if (!existsSync(filePath)) return;

      console.log(`\nFile changed: ${filename}`);
      try {
        importPost(filePath, opts);
      } catch (err) {
        console.error(`  Error importing ${filename}: ${err.message}`);
      }
    }, 500);
  });
}

function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (opts.file) {
    const filePath = resolve(opts.file);
    if (!existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }
    console.log(`Importing: ${filePath}`);
    const result = importPost(filePath, opts);
    console.log(`\nDone!`);
    console.log(`  Title: ${result.title}`);
    console.log(`  Slug: ${result.slug}`);
    console.log(`  Published: ${result.published}`);
  } else {
    syncAll(opts);

    if (opts.watch) {
      watchObsidian(opts);
    }
  }
}

main();
