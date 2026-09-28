# wp-build Changesets workspace experiment

The Changesets post type still stores each changeset. On WordPress 7.0 or newer, the plugin hides its classic post list and registers a route-based `Changesets` admin page at `admin.php?page=changesets-wp-admin`. Older installations continue to use the classic list and review screen. Existing list and review bookmarks redirect to the new routes when the workspace is available.

The page uses the experimental `@wordpress/build` page and file-based route APIs. The home route uses `DataViews` for changeset search, filtering, sorting, and pagination. The review route uses `DataViews` for staged content. Both use `@wordpress/ui` Card and Badge, `@wordpress/components` controls, and WPDS design tokens. The build bundles DataViews and UI because these packages do not expose WordPress script globals. Gutenberg does not need to be installed. The build copies the DataViews stylesheet and design tokens into `build/vendor`; the admin page enqueues them with `wp-components` as a dependency.

The route data comes from `changesets/v1/workspace`. Create, approve, and publish actions call the plugin's existing workflow functions, with the same capabilities and approval gate. The review route displays staged posts, settings, and global styles. It does not yet edit staged content in place.

Build after changing the route source:

```sh
npm ci
npm run build
```

Commit the generated `build/` files with source changes. The post-build step keeps compact module wrappers for `SCRIPT_DEBUG`; both normal and debug modes were tested in Studio. This is an experimental branch: `@wordpress/build` pages and routes may change, and the list currently loads all changesets for client-side DataViews operations. A server-paginated endpoint would be appropriate for large sites.
