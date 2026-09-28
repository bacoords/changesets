<?php
/**
 * Preview controls in the WordPress admin bar for logged-in users and a
 * standalone preview bar for logged-out visitors.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
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
	<style id="dcp-changeset-bar-styles">
		.dcp-changeset-bar {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99998;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 12px;
			box-sizing: border-box;
			width: 100%;
			height: 32px;
			padding: 0 14px;
			background: #1e1e1e;
			color: #f0f0f0;
			font: 13px/32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
		}
		.dcp-changeset-bar__label {
			display: flex;
			align-items: baseline;
			gap: 8px;
			min-width: 0;
			overflow: hidden;
		}
		.dcp-changeset-bar__kicker {
			opacity: 0.7;
			text-transform: uppercase;
			letter-spacing: 0.04em;
			font-size: 11px;
			font-weight: 600;
			flex: 0 0 auto;
		}
		.dcp-changeset-bar__title {
			font-weight: 600;
			color: #fff;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.dcp-changeset-bar__status {
			opacity: 0.75;
			font-size: 12px;
			flex: 0 0 auto;
		}
		.dcp-changeset-bar__exit {
			flex: 0 0 auto;
			display: inline-block;
			background: #fcf9e8;
			color: #1e1e1e;
			font-weight: 600;
			line-height: 1;
			text-decoration: none;
			padding: 6px 10px;
			border-radius: 2px;
		}
		.dcp-changeset-bar__exit:hover {
			background: #fff3bf;
			color: #000;
		}
		body.dcp-previewing .is-position-sticky {
			top: 32px !important;
		}
		body.dcp-previewing.admin-bar .is-position-sticky {
			top: 64px !important;
		}
		body.dcp-previewing .wp-block-navigation__responsive-container.is-menu-open {
			z-index: 100001 !important;
		}
		@media screen and (max-width: 782px) {
			.dcp-changeset-bar {
				position: absolute;
				height: 46px;
				font-size: 14px;
				line-height: 46px;
				padding: 0 12px;
			}
			.dcp-changeset-bar__exit {
				padding: 8px 12px;
			}
			body.dcp-previewing .is-position-sticky {
				top: 46px !important;
			}
			body.dcp-previewing.admin-bar .is-position-sticky {
				top: 92px !important;
			}
		}
	</style>
	<div class="dcp-changeset-bar" role="banner" aria-label="<?php echo esc_attr__( 'Changeset preview', 'changesets' ); ?>">
		<div class="dcp-changeset-bar__label">
			<span class="dcp-changeset-bar__kicker"><?php echo esc_html__( 'Changeset', 'changesets' ); ?></span>
			<span class="dcp-changeset-bar__title"><?php echo esc_html( $title ); ?></span>
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
			var adminBar = document.getElementById('wpadminbar');
			var barHeight = bar ? bar.offsetHeight : 32;
			var adminHeight = adminBar ? adminBar.offsetHeight : 0;
			
			if (adminHeight > 0) {
				bar.style.top = adminHeight + 'px';
			}
			document.documentElement.style.setProperty('margin-top', (adminHeight + barHeight) + 'px', 'important');
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
 * Link the active changeset to its review screen in the native admin bar.
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

	$label = sprintf(
		/* translators: %s: changeset title. */
		__( 'Changeset: %s', 'changesets' ),
		get_the_title( $changeset )
	);
	$icon = '<svg class="cs-admin-bar-badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="6" cy="3" r="2"/><circle cx="6" cy="21" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 5v14M18 8a6 6 0 0 1-6 6H6"/></svg>';

	$admin_bar->add_node(
		array(
			'id'    => 'changesets',
			'title' => '<span class="cs-admin-bar-badge">' . $icon . '<span class="cs-admin-bar-badge__label">' . esc_html( $label ) . '</span></span>',
			'href'  => cs_review_url( $changeset->ID ),
			'meta'  => array(
				'class' => 'cs-active-changeset',
				'title' => $label,
			),
		)
	);
}
// Core adds Edit Site at priority 40; register immediately before it.
add_action( 'admin_bar_menu', 'cs_add_admin_bar_menu', 39 );

/**
 * Load the badge style only while a manageable changeset preview is active.
 */
function cs_enqueue_admin_bar_badge() {
	if ( ! is_user_logged_in() || ! current_user_can( 'manage_changesets' ) || ! is_admin_bar_showing() ) {
		return;
	}

	$uuid = cs_get_active_preview_uuid();
	if ( ! $uuid || ! cs_get_changeset( $uuid ) ) {
		return;
	}

	wp_enqueue_style( 'cs-design-tokens', CS_URL . 'build/vendor/design-tokens.css', array(), CS_VERSION );
	wp_enqueue_style( 'cs-admin-bar', CS_URL . 'assets/admin-bar.css', array( 'cs-design-tokens' ), CS_VERSION );
}
add_action( 'wp_enqueue_scripts', 'cs_enqueue_admin_bar_badge' );
add_action( 'admin_enqueue_scripts', 'cs_enqueue_admin_bar_badge' );

/**
 * Changesets list: Preview opens the front-end overlay; no Quick Edit; no Edit.
 *
 * @param array   $actions Row actions.
 * @param WP_Post $post    Post.
 * @return array
 */
function cs_changeset_row_actions( $actions, $post ) {
	if ( ! $post || 'changeset' !== $post->post_type ) {
		return $actions;
	}

	$trash  = isset( $actions['trash'] ) ? array( 'trash' => $actions['trash'] ) : array();
	$status = cs_get_changeset_status( $post->ID );
	$url    = cs_get_preview_url( $post->ID );

	$out = array();
	if ( $url && in_array( $status, array( 'open', 'approved' ), true ) ) {
		$out['cs_preview'] = sprintf(
			'<a href="%s">%s</a>',
			esc_url( $url ),
			esc_html__( 'Preview Changeset', 'changesets' )
		);
	}

	return $out + $trash;
}
add_filter( 'post_row_actions', 'cs_changeset_row_actions', 10, 2 );

/**
 * Point list title / edit link at Preview for open changesets.
 *
 * @param string      $url     Edit URL.
 * @param int|WP_Post $post_id Post.
 * @param string      $context Context.
 * @return string
 */
function cs_changeset_edit_link_to_preview( $url, $post_id, $context = 'display' ) {
	$post = get_post( $post_id );
	if ( ! $post || 'changeset' !== $post->post_type ) {
		return $url;
	}
	$status  = cs_get_changeset_status( $post->ID );
	$preview = cs_get_preview_url( $post->ID );
	if ( $preview && in_array( $status, array( 'open', 'approved' ), true ) ) {
		return $preview;
	}
	return $url;
}
add_filter( 'get_edit_post_link', 'cs_changeset_edit_link_to_preview', 10, 3 );

/**
 * Hide Quick Edit on the Changesets list.
 */
function cs_disable_changeset_quick_edit() {
	$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
	if ( ! $screen || 'edit-changeset' !== $screen->id ) {
		return;
	}
	wp_add_inline_style(
		'common',
		'.post-type-changeset .row-actions .inline, .post-type-changeset button.editinline { display: none !important; }'
	);
}
add_action( 'admin_enqueue_scripts', 'cs_disable_changeset_quick_edit' );

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
