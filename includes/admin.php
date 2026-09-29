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
			<button
				type="button"
				class="dcp-changeset-bar__trigger"
				aria-haspopup="dialog"
				aria-expanded="false"
				aria-label="<?php echo esc_attr( sprintf( __( 'Review changeset: %s', 'changesets' ), $title ) ); ?>"
			>
				<?php echo cs_changeset_badge_html( $title ); // Escaped in helper. ?>
			</button>
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
 * Add the active changeset badge as its own admin bar item.
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

	$admin_bar->add_node(
		array(
			'id'    => 'changesets-panel',
			'title' => cs_changeset_badge_html( get_the_title( $changeset ) ),
			'href'  => cs_get_preview_url( $changeset->ID ),
			'meta'  => array(
				'class' => 'cs-changesets-panel-trigger',
				'title' => __( 'Review changeset', 'changesets' ),
			),
		)
	);
}
// Core adds site-name at priority 30 and Edit Site at 40.
add_action( 'admin_bar_menu', 'cs_add_admin_bar_menu', 39 );

/**
 * Build a preview URL for staged content when the post type has a permalink.
 *
 * @param WP_Post $staged       Staged draft.
 * @param int     $source_id    Published source ID, if any.
 * @param WP_Post $changeset    Active changeset.
 * @return string
 */
function cs_changeset_panel_content_url( $staged, $source_id, $changeset ) {
	$post_type = get_post_type_object( $staged->post_type );
	if ( ! $post_type || ! is_post_type_viewable( $post_type ) ) {
		return '';
	}

	$target_id = $source_id ? $source_id : $staged->ID;
	$front_id  = (int) get_option( 'page_on_front' );
	if ( 'page' === $staged->post_type && 'page' === get_option( 'show_on_front' ) && in_array( $front_id, array( (int) $target_id, (int) $staged->ID ), true ) ) {
		$url = home_url( '/' );
	} elseif ( ! $source_id && 'page' === $staged->post_type ) {
		$url = home_url( user_trailingslashit( '/' . ltrim( get_page_uri( $staged->ID ), '/' ), 'page' ) );
	} else {
		$url = get_permalink( $target_id );
	}

	return $url ? add_query_arg( 'changeset', cs_get_changeset_uuid( $changeset->ID ), $url ) : '';
}

/**
 * Format the staged value of a site setting for the review panel.
 *
 * @param string $key   Option name.
 * @param mixed  $value Staged value.
 * @return string
 */
function cs_changeset_panel_setting_value( $key, $value ) {
	if ( in_array( $key, array( 'page_on_front', 'page_for_posts' ), true ) ) {
		return $value ? get_the_title( (int) $value ) : __( 'None', 'changesets' );
	}
	if ( 'show_on_front' === $key ) {
		return 'page' === $value ? __( 'A static page', 'changesets' ) : __( 'Latest posts', 'changesets' );
	}
	if ( is_bool( $value ) ) {
		return $value ? __( 'Yes', 'changesets' ) : __( 'No', 'changesets' );
	}
	if ( is_scalar( $value ) ) {
		return (string) $value;
	}
	return wp_json_encode( $value );
}

/**
 * Prepare the active changeset's complete review list for the WPDS panel.
 *
 * @param WP_Post $changeset Changeset.
 * @return array
 */
function cs_changeset_panel_data( $changeset ) {
	$review  = cs_review_serialize_changeset( $changeset, true );
	$content = array();
	foreach ( $review['content'] as $item ) {
		$staged = get_post( $item['id'] );
		if ( ! $staged ) {
			continue;
		}
		$post_type = get_post_type_object( $staged->post_type );
		$title     = get_the_title( $staged );
		$content[] = array(
			'title'  => $title ? $title : __( '(Untitled)', 'changesets' ),
			'type'   => $post_type ? $post_type->labels->singular_name : $staged->post_type,
			'change' => $item['change'],
			'url'    => cs_changeset_panel_content_url( $staged, (int) $item['source_id'], $changeset ),
		);
	}

	$settings       = array();
	$setting_labels = array(
		'show_on_front'   => __( 'Homepage display', 'changesets' ),
		'page_on_front'   => __( 'Homepage page', 'changesets' ),
		'page_for_posts'  => __( 'Posts page', 'changesets' ),
		'blogname'        => __( 'Site title', 'changesets' ),
		'blogdescription' => __( 'Tagline', 'changesets' ),
	);
	foreach ( cs_get_staged_options( $changeset->ID ) as $key => $item ) {
		$value      = is_array( $item ) && array_key_exists( 'value', $item ) ? $item['value'] : $item;
		$show_value = current_user_can( 'manage_changesets' ) || isset( $setting_labels[ $key ] );
		$settings[] = array(
			'label' => isset( $setting_labels[ $key ] ) ? $setting_labels[ $key ] : ucwords( str_replace( '_', ' ', $key ) ),
			'value' => $show_value ? cs_changeset_panel_setting_value( $key, $value ) : '',
		);
	}

	$styles = array();
	foreach ( $review['theme_json_changes'] as $change ) {
		$styles[] = $change['path'];
	}
	if ( empty( $styles ) && ! empty( $review['styles'] ) ) {
		$styles[] = __( 'Global styles', 'changesets' );
	}

	return array(
		'title'       => get_the_title( $changeset ),
		'status'      => cs_get_changeset_status( $changeset->ID ),
		'content'     => $content,
		'styles'      => $styles,
		'settings'    => $settings,
		'labels'      => array(
			'content'       => __( 'Content', 'changesets' ),
			'styles'        => __( 'Theme styles', 'changesets' ),
			'settings'      => __( 'Site settings', 'changesets' ),
			'new'           => __( 'New', 'changesets' ),
			'update'        => __( 'Updated', 'changesets' ),
			'empty'         => __( 'No changes staged yet.', 'changesets' ),
			'status'        => __( 'Status', 'changesets' ),
			'open'          => __( 'Open', 'changesets' ),
			'approved'      => __( 'Approved', 'changesets' ),
			'view'          => __( 'View in preview', 'changesets' ),
			'close'         => __( 'Close changeset review', 'changesets' ),
			'changeOne'     => __( 'change', 'changesets' ),
			'changeMany'    => __( 'changes', 'changesets' ),
		),
	);
}

/**
 * Load the official WPDS tokens and shared preview controls when needed.
 */
function cs_enqueue_preview_controls() {
	if ( is_user_logged_in() && ( ! current_user_can( 'manage_changesets' ) || ! is_admin_bar_showing() ) ) {
		return;
	}

	$uuid = cs_get_active_preview_uuid();
	$changeset = $uuid ? cs_get_changeset( $uuid ) : null;
	if ( ! $changeset ) {
		return;
	}

	wp_enqueue_script(
		'cs-changeset-panel',
		CS_URL . 'assets/changeset-panel.js',
		array( 'wp-element', 'wp-components' ),
		CS_VERSION,
		true
	);
	wp_localize_script( 'cs-changeset-panel', 'csChangesetPanel', cs_changeset_panel_data( $changeset ) );
	wp_enqueue_style( 'cs-preview-controls', CS_URL . 'assets/preview-controls.css', array( 'wp-theme', 'wp-components' ), CS_VERSION );
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
