<?php
/**
 * Plugin Name:       Changesets
 * Description:       Let agents accumulate edits in a Changeset, preview them on the real site, then Publish Changeset after human approval.
 * Version:           0.5.3
 * Requires at least: 6.9
 * Requires PHP:      7.4
 * Author:            Rich Tabor
 * License:           GPL-2.0-or-later
 * Text Domain:       changesets
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'CS_VERSION', '0.5.3' );
define( 'CS_FILE', __FILE__ );
define( 'CS_PATH', plugin_dir_path( __FILE__ ) );
define( 'CS_URL', plugin_dir_url( __FILE__ ) );

define( 'CS_META_SOURCE', '_changeset_source' );

require_once CS_PATH . 'includes/caps.php';
require_once CS_PATH . 'includes/changesets.php';
require_once CS_PATH . 'includes/admin.php';
require_once CS_PATH . 'includes/admin-workflow.php';
require_once CS_PATH . 'includes/workspace.php';
require_once CS_PATH . 'abilities/register.php';

/**
 * Bootstrap.
 */
function cs_init() {
	cs_register_caps();
}
add_action( 'init', 'cs_init' );

/**
 * Activation: add custom caps to Administrator and Editor.
 */
function cs_activate() {
	cs_register_caps();
}
register_activation_hook( __FILE__, 'cs_activate' );
