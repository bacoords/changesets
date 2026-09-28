import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const output = join( process.cwd(), 'build', 'vendor' );
mkdirSync( output, { recursive: true } );
for ( const [ source, target ] of [
  [ 'node_modules/@wordpress/dataviews/build-style/style.css', 'dataviews.css' ],
  [ 'node_modules/@wordpress/dataviews/build-style/style-rtl.css', 'dataviews-rtl.css' ],
  [ 'node_modules/@wordpress/theme/prebuilt/css/design-tokens.css', 'design-tokens.css' ],
] ) {
  copyFileSync( join( process.cwd(), source ), join( output, target ) );
}

// wp-build currently leaves an extra blank line in this generated file.
const routesPhp = join( process.cwd(), 'build', 'routes.php' );
writeFileSync( routesPhp, readFileSync( routesPhp, 'utf8' ).trimEnd() + '\n' );

// Keep SCRIPT_DEBUG routes usable without committing duplicated, generated bundles.
for ( const name of [ 'changesets-home', 'changeset-review' ] ) {
  const route = join( process.cwd(), 'build', 'routes', name, 'content.js' );
  writeFileSync( route, "export { stage } from './content.min.js';\n" );
}
