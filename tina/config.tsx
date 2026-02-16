import React from 'react';
import { defineConfig, wrapFieldsWithMeta } from 'tinacms';

// Inject global admin CSS overrides once
function injectAdminStyles() {
  const id = 'tina-custom-styles';
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = `
    [data-slate-editor="true"] { min-height: 60vh !important; }
    [data-slate-editor="true"] > * { min-height: auto; }
  `;
  document.head.appendChild(style);
}

// Wrapper for fields that should render at a narrower width
const NarrowField = wrapFieldsWithMeta(({ field, input, meta }: any) => {
  React.useEffect(() => { injectAdminStyles(); }, []);
  const baseInputClass =
    'shadow-inner focus:shadow-outline focus:border-blue-500 focus:outline-none block text-base placeholder:text-gray-300 px-3 py-2 text-gray-600 w-full bg-white border border-gray-200 transition-all ease-out duration-150 focus:text-gray-900 rounded-md';

  if (field.type === 'boolean') {
    return (
      <div style={{ maxWidth: '160px' }}>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!!input.value}
            onChange={(e) => input.onChange(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600"
          />
          <span className="text-sm text-gray-700">{input.value ? 'Yes' : 'No'}</span>
        </label>
      </div>
    );
  }

  if (field.type === 'datetime') {
    return (
      <div style={{ maxWidth: '280px' }}>
        <input
          type="datetime-local"
          value={input.value ? input.value.slice(0, 16) : ''}
          onChange={(e) => {
            const val = e.target.value;
            input.onChange(val ? new Date(val).toISOString() : '');
          }}
          className={baseInputClass}
        />
      </div>
    );
  }

  return <input {...input} className={baseInputClass} />;
});

// Combined row: draft checkbox + both date fields
const DraftAndDates = (props: any) => {
  React.useEffect(() => { injectAdminStyles(); }, []);
  const form = props.form;
  const draft = form.getState().values.draft || false;
  const published = form.getState().values.published || '';

  const baseInputClass =
    'shadow-inner focus:shadow-outline focus:border-blue-500 focus:outline-none block text-base placeholder:text-gray-300 px-3 py-2 text-gray-600 w-full bg-white border border-gray-200 transition-all ease-out duration-150 focus:text-gray-900 rounded-md';
  const labelClass = 'block font-sans text-xs font-semibold text-gray-700 whitespace-normal mb-2';

  return (
    <div className="mb-5">
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
        <div>
          <label className={labelClass}>Draft</label>
          <div style={{ height: '42px', display: 'flex', alignItems: 'center' }}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!draft}
                onChange={(e) => form.change('draft', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm text-gray-700">{draft ? 'Yes' : 'No'}</span>
            </label>
          </div>
        </div>
        <div style={{ flex: '1', maxWidth: '280px' }}>
          <label className={labelClass}>Publish Date *</label>
          <input
            type="datetime-local"
            value={published ? published.slice(0, 16) : ''}
            onChange={(e) => {
              const val = e.target.value;
              form.change('published', val ? new Date(val).toISOString() : '');
            }}
            className={baseInputClass}
          />
        </div>
      </div>
    </div>
  );
};

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
        ui: {
          filename: {
            readonly: true,
            slugify: (values: Record<string, any>) => {
              return (values?.title || 'untitled')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
            },
          },
          defaultItem: () => ({
            draft: true,
            published: new Date().toISOString(),
          }),
          beforeSubmit: async ({ values }: { values: Record<string, any> }) => {
            if (values.title && !values.slug) {
              return {
                ...values,
                slug: values.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-|-$/g, ''),
              };
            }
            return values;
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Title', required: true, isTitle: true },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
          { type: 'boolean', name: 'draft', label: 'Draft', ui: { component: () => null } },
          { type: 'string', name: 'excerpt', label: 'Excerpt', ui: { component: 'textarea' } },
          { type: 'datetime', name: 'published', label: 'Publish Date', required: true, ui: { component: DraftAndDates } },
          { type: 'string', name: 'tags', label: 'Tags', list: true, ui: { component: 'tags' } },
          {
            type: 'string',
            name: 'slug',
            label: 'Slug',
            required: true,
            ui: {
              component: (props: any) => {
                const [locked, setLocked] = React.useState(true);
                return (
                  <div className="mb-5">
                    <label className="block font-sans text-xs font-semibold text-gray-700 whitespace-normal mb-2">
                      Slug
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={props.input.value || ''}
                        onChange={props.input.onChange}
                        disabled={locked}
                        className={`border rounded-md px-3 py-2 w-full text-sm pr-10 ${
                          locked
                            ? 'bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-gray-900 border-blue-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setLocked(!locked)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        title={locked ? 'Unlock to edit' : 'Lock field'}
                      >
                        {locked ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                          </svg>
                        )}
                      </button>
                    </div>
                    <span className="block text-xs text-gray-400 mt-1 italic">
                      {locked ? 'Auto-generated from title. Click lock to override.' : 'Editing enabled. Click lock to re-lock.'}
                    </span>
                  </div>
                );
              },
            },
          },
        ],
      },
    ],
  },
});
