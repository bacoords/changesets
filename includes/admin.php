<?php
/**
 * Preview controls in the WordPress admin bar for logged-in users and a
 * standalone preview bar for logged-out visitors.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render the same escaped badge in the native and logged-out preview bars.
 *
 * @param string $title Changeset title.
 * @return string Badge markup.
 */
function cs_changeset_badge_html( $title ) {
	$accessible_label = sprintf(
		/* translators: %s: changeset title. */
		__( 'Active changeset: %s', 'changesets' ),
		$title
	);
	$icon = '<svg class="cs-changeset-badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="6" cy="3" r="2"/><circle cx="6" cy="21" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 5v14M18 8a6 6 0 0 1-6 6H6"/></svg>';
	return '<span class="cs-changeset-badge" aria-label="' . esc_attr( $accessible_label ) . '">' . $icon . '<span class="cs-changeset-badge__label">' . esc_html( $title ) . '</span></span>';
}

/**
 * Render the standalone Changeset bar for logged-out previews.
 */
function cs_render_changeset_bar() {
	if ( is_user_logged_in() ) {
		return;
	}

	$uuid = cs_get_active_preview_uuid();
	if ( ! $uuid ) {
		return;
	}

	$changeset = cs_get_changeset( $uuid );
	if ( ! $changeset ) {
		return;
	}

	$exit_url = add_query_arg(
		array(
			'cs_exit_preview' => '1',
			'changeset'        => false,
		)
	);

	$title  = get_the_title( $changeset );
	$status = cs_get_changeset_status( $changeset->ID );
	?>
	<div class="dcp-changeset-bar" role="banner" aria-label="<?php echo esc_attr__( 'Changeset preview', 'changesets' ); ?>">
		<div class="dcp-changeset-bar__label">
			<?php echo cs_changeset_badge_html( $title ); // Escaped in helper. ?>
			<?php if ( $status && 'open' !== $status ) : ?>
				<span class="dcp-changeset-bar__status"><?php echo esc_html( $status ); ?></span>
			<?php endif; ?>
		</div>
		<a class="dcp-changeset-bar__exit" href="<?php echo esc_url( $exit_url ); ?>">
			<?php echo esc_html__( 'Exit Changeset', 'changesets' ); ?>
		</a>
	</div>
	<script>
		(function() {
			var bar = document.querySelector('.dcp-changeset-bar');
			if (!bar) {
				return;
			}
			function positionBar() {
				var adminBar = document.getElementById('wpadminbar');
				var adminHeight = adminBar ? adminBar.offsetHeight : 0;
				var barHeight = bar.offsetHeight;
				bar.style.top = adminHeight + 'px';
				document.documentElement.style.setProperty('--cs-preview-bar-height', barHeight + 'px');
				document.documentElement.style.setProperty('--cs-preview-admin-height', adminHeight + 'px');
				document.documentElement.style.setProperty('margin-top', (adminHeight + barHeight) + 'px', 'important');
			}
			positionBar();
			window.addEventListener('resize', positionBar);
			if (window.ResizeObserver) {
				new ResizeObserver(positionBar).observe(bar);
			}
		})();
	</script>
	<?php
}
add_action( 'wp_body_open', 'cs_render_changeset_bar', 1 );
add_action( 'wp_footer', 'cs_render_changeset_bar_footer_fallback', 999 );

/**
 * Fallback if the theme never calls wp_body_open.
 */
function cs_render_changeset_bar_footer_fallback() {
	if ( did_action( 'wp_body_open' ) ) {
		return;
	}
	cs_render_changeset_bar();
}

/**
 * Add the active changeset badge to the existing site-name menu item.
 *
 * @param WP_Admin_Bar $admin_bar Admin bar instance.
 */
function cs_add_admin_bar_menu( $admin_bar ) {
	if ( ! is_user_logged_in() || ! current_user_can( 'manage_changesets' ) ) {
		return;
	}

	$uuid      = cs_get_active_preview_uuid();
	$changeset = $uuid ? cs_get_changeset( $uuid ) : null;
	if ( ! $changeset ) {
		return;
	}

	$site_name = $admin_bar->get_node( 'site-name' );
	if ( ! $site_name ) {
		return;
	}

	$admin_bar->add_node(
		array(
			'id'    => 'site-name',
			'title' => '<span class="cs-site-name-label">' . $site_name->title . '</span>' . cs_changeset_badge_html( get_the_title( $changeset ) ),
		)
	);
}
// Core adds site-name at priority 30 and Edit Site at 40.
add_action( 'admin_bar_menu', 'cs_add_admin_bar_menu', 39 );

/**
 * Load the official WPDS tokens and shared preview controls when needed.
 */
function cs_enqueue_preview_controls() {
	if ( is_user_logged_in() && ( ! current_user_can( 'manage_changesets' ) || ! is_admin_bar_showing() ) ) {
		return;
	}

	$uuid = cs_get_active_preview_uuid();
	if ( ! $uuid || ! cs_get_changeset( $uuid ) ) {
		return;
	}

	wp_enqueue_style( 'cs-preview-controls', CS_URL . 'assets/preview-controls.css', array( 'wp-theme' ), CS_VERSION );
}
add_action( 'wp_enqueue_scripts', 'cs_enqueue_preview_controls' );
add_action( 'admin_enqueue_scripts', 'cs_enqueue_preview_controls' );

/**
 * Mark preview sessions on <html> for admin-bar-like offset.
 *
 * @param array $classes Classes.
 * @return array
 */
function cs_previewing_admin_body_class( $classes ) {
	if ( ! is_user_logged_in() && cs_get_active_preview_uuid() && cs_get_changeset( cs_get_active_preview_uuid() ) ) {
		$classes[] = 'dcp-previewing';
	}
	return $classes;
}
add_filter( 'body_class', 'cs_previewing_admin_body_class' );
