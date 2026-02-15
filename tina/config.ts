import { defineConfig } from 'tinacms';

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    'main',
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'settings',
        label: 'Site Settings',
        path: 'src/content/settings',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Site Title', required: true },
          { type: 'string', name: 'description', label: 'Site Description', required: true },
          { type: 'string', name: 'footerText', label: 'Footer Text' },
        ],
      },
      {
        name: 'about',
        label: 'About',
        path: 'src/content/about',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: 'string', name: 'bio', label: 'Bio', ui: { component: 'textarea' } },
          { type: 'image', name: 'headshot', label: 'Headshot' },
          {
            type: 'object',
            name: 'skillCategories',
            label: 'Skill Categories',
            list: true,
            fields: [
              { type: 'string', name: 'title', label: 'Category Title', required: true },
              { type: 'string', name: 'items', label: 'Items', list: true },
            ],
          },
          {
            type: 'string',
            name: 'interests',
            label: 'Interests',
            list: true,
          },
        ],
      },
      {
        name: 'experience',
        label: 'Experience',
        path: 'src/content/cv',
        format: 'md',
        fields: [
          { type: 'string', name: 'company', label: 'Company', required: true },
          { type: 'string', name: 'location', label: 'Location', required: true },
          { type: 'number', name: 'sortOrder', label: 'Sort Order' },
          {
            type: 'object',
            name: 'roles',
            label: 'Roles',
            list: true,
            fields: [
              { type: 'string', name: 'title', label: 'Title', required: true },
              { type: 'number', name: 'startYear', label: 'Start Year', required: true },
              { type: 'number', name: 'endYear', label: 'End Year' },
              { type: 'boolean', name: 'hasDescription', label: 'Has Description' },
            ],
          },
        ],
      },
      {
        name: 'education',
        label: 'Education',
        path: 'src/content/education',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'object',
            name: 'credentials',
            label: 'Credentials',
            list: true,
            fields: [
              { type: 'string', name: 'name', label: 'Degree/Certificate', required: true },
              { type: 'string', name: 'institution', label: 'Institution', required: true },
              { type: 'number', name: 'startYear', label: 'Start Year', required: true },
              { type: 'number', name: 'endYear', label: 'End Year' },
              { type: 'string', name: 'location', label: 'Location', required: true },
            ],
          },
        ],
      },
      {
        name: 'project',
        label: 'Projects',
        path: 'src/content/portfolio',
        format: 'md',
        fields: [
          { type: 'string', name: 'name', label: 'Project Name', required: true },
          { type: 'string', name: 'stack', label: 'Tech Stack', required: true },
          { type: 'string', name: 'infrastructure', label: 'Infrastructure', required: true },
          { type: 'string', name: 'description', label: 'Short Description', required: true },
          { type: 'string', name: 'category', label: 'Category', required: true, options: ['professional', 'personal'] },
          { type: 'number', name: 'sortOrder', label: 'Sort Order' },
          { type: 'image', name: 'logo', label: 'Logo' },
          { type: 'number', name: 'logoWidth', label: 'Logo Width' },
          { type: 'image', name: 'heroImage', label: 'Hero Image' },
          { type: 'string', name: 'websiteUrl', label: 'Website URL' },
          { type: 'string', name: 'githubUrl', label: 'GitHub URL' },
          { type: 'boolean', name: 'codeIsPublic', label: 'Code Is Public' },
          { type: 'boolean', name: 'isAccessible', label: 'Site Is Accessible', ui: { description: 'Is the website still accessible?' } },
        ],
      },
      {
        name: 'testimonial',
        label: 'Testimonials',
        path: 'src/content/testimonials',
        format: 'md',
        fields: [
          { type: 'string', name: 'from', label: 'From', required: true },
          { type: 'string', name: 'type', label: 'Type', required: true },
          { type: 'string', name: 'relationship', label: 'Relationship', required: true },
          { type: 'string', name: 'date', label: 'Date', required: true },
          { type: 'string', name: 'themes', label: 'Themes', required: true },
          { type: 'number', name: 'sortOrder', label: 'Sort Order' },
        ],
      },
      {
        name: 'socialLinks',
        label: 'Social Links',
        path: 'src/content/social-links',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'object',
            name: 'links',
            label: 'Links',
            list: true,
            fields: [
              { type: 'string', name: 'name', label: 'Name', required: true },
              { type: 'string', name: 'icon', label: 'Icon', required: true, options: ['github', 'linkedin', 'twitter', 'external-link'] },
              { type: 'string', name: 'url', label: 'URL', required: true },
              { type: 'string', name: 'content', label: 'Description', required: true },
              { type: 'string', name: 'joined', label: 'Joined Date', required: true },
              { type: 'string', name: 'active', label: 'Status', required: true },
            ],
          },
        ],
      },
      {
        name: 'post',
        label: 'Blog Posts',
        path: 'src/content/blog',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Title', required: true, isTitle: true },
          { type: 'string', name: 'slug', label: 'Slug', required: true },
          { type: 'string', name: 'excerpt', label: 'Excerpt', ui: { component: 'textarea' } },
          { type: 'datetime', name: 'date', label: 'Publish Date', required: true },
          { type: 'datetime', name: 'updatedDate', label: 'Updated Date' },
          { type: 'string', name: 'tags', label: 'Tags', list: true },
          { type: 'boolean', name: 'draft', label: 'Draft' },
        ],
      },
    ],
  },
});
