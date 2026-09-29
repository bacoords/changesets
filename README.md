# Changesets

Accumulate site edits in a staging Changeset, preview them on the live site without touching production, then Publish Changeset after human approval.

## For agents

**Agent prompt** (paste-ready):

> You have access to a WordPress site. Before staging changes: (1) Check that WordPress 7.0+, Gutenberg, Changesets, and WordPress MCP Adapter are installed and active by verifying `changesets/*` abilities are available via MCP. (2) If missing, explain which plugins are required, ask permission to install, then install if allowed. (3) Once plugins are active, ensure MCP connection with Application Password. Then workflow: create changeset → stage changes with changesets/save (type: content/styles/setting) → give human the preview URL and wait for approval → after approval call changesets/approve then changesets/publish. Never edit live content directly unless human explicitly requests a repair outside Changesets.

**Setup checklist** (verify BEFORE asking for credentials):
1. Is the site running WordPress 7.0+ with Gutenberg, Changesets, and MCP Adapter active?
2. Verify by checking if `changesets/*` abilities are available via MCP tools
3. If missing: Ask permission to install, then install if allowed
4. Only after plugins are active: Request Application Password / MCP connection if not connected

**Why**: Site URL alone ≠ MCP access. You need the adapter plugin + authenticated connection for `changesets/*` tools to appear.

**Critical rule**: Never edit live posts, options, or styles directly. Use Changesets abilities only. Only bypass Changesets if human explicitly asks for a live repair.

**Workflow**:
1. **Create a changeset**: `changesets/create` → returns `{ preview_url, uuid, changeset_id }`
2. **Stage work**: `changesets/save` with one of three `type` values:
   - `content` — page/post/template/template-part/navigation/CPT
   - `styles` — global styles and style variations
   - `setting` — site options (blogname, page_on_front, etc.)
3. **Preview**: Give the human the `?changeset=<uuid>` URL and **wait for approval**
4. **Publish**: After approval, call `changesets/approve`, then `changesets/publish`

Use `changesets/list` with `status: "all"` to inspect all changesets, including published ones. Use `changesets/get` for staged content, settings, theme.json changes, preview links, and available actions.

**What stages**: Content (pages, posts, templates, template parts, navigation, custom post types), global styles, style variations, and settings (site title, homepage, site logo, site icon, featured images).

**Media policy**: Attachment posts are never staged in changesets. Uploads go directly to the Media Library and persist even if the changeset is discarded. Changesets stage only references: featured images (`featured_media`), site logo (`custom_logo`), site icon (`site_icon`), and content HTML/blocks containing attachment IDs.

**Settings**: Site options and theme_mods are staged via `type=setting`. The plugin auto-detects storage type (option vs theme_mod) for known keys like `custom_logo` (theme_mod) and `site_icon` (option).

See [readme.txt](readme.txt) for complete documentation.

## Setup

**Requirements**: Hosted WordPress 7.0+ and the Gutenberg plugin (not Playground)

1. Install and activate **Gutenberg** and **Changesets** on your WordPress site
2. Install and activate **WordPress MCP Adapter** for agent access
3. Create an Application Password (propose-only user without publish permissions recommended)
4. Connect your MCP client to the site using the Application Password

Changesets has no wp-admin screen. Create, inspect, approve, and publish changesets through its abilities. During an active preview, the native admin bar shows the changeset badge for logged-in users; it links to the preview homepage. Logged-out previews retain the standalone preview bar.

**Private preview mode** (optional): Require logged-in users with `manage_changesets` capability to preview changesets. Add to `wp-config.php`:

```php
define( 'CHANGESETS_PRIVATE_PREVIEWS', true );
```

When enabled, only logged-in users with the appropriate capability can use `?changeset=<uuid>` preview URLs. When disabled (default), anyone with the UUID can preview.

## License

GPLv2 or later
