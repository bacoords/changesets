( function () {
	'use strict';

	function init() {
		var trigger = document.querySelector(
			'#wp-admin-bar-changesets-panel > .ab-item, .dcp-changeset-bar__trigger'
		);
		var data = window.csChangesetPanel;
		if ( ! trigger || ! data || ! window.wp || ! wp.element || ! wp.components ) {
			return;
		}

		var el = wp.element.createElement;
		var useState = wp.element.useState;
		var useEffect = wp.element.useEffect;
		var Button = wp.components.Button;
		var Modal = wp.components.Modal;
		var mount = document.createElement( 'div' );
		mount.id = 'cs-changeset-panel-root';
		document.body.appendChild( mount );

		trigger.setAttribute( 'aria-haspopup', 'dialog' );
		trigger.setAttribute( 'aria-expanded', 'false' );

		function section( title, items, renderItem ) {
			if ( ! items.length ) {
				return null;
			}
			return el(
				'section',
				{ className: 'cs-panel-section', key: title },
				el(
					'h2',
					{ className: 'cs-panel-section__title' },
					title,
					el( 'span', { className: 'cs-panel-count' }, String( items.length ) )
				),
				el(
					'ul',
					{ className: 'cs-panel-list' },
					items.map( renderItem )
				)
			);
		}

		function contentItem( item, index ) {
			var title = item.url
				? el(
						Button,
						{
							href: item.url,
							variant: 'link',
							className: 'cs-panel-content-link',
							'aria-label': item.title + ' — ' + data.labels.view,
						},
						item.title,
						el( 'span', { 'aria-hidden': 'true' }, ' ↗' )
				  )
				: el( 'span', { className: 'cs-panel-content-title' }, item.title );

			return el(
				'li',
				{ className: 'cs-panel-item', key: 'content-' + index },
				el(
					'span',
					{ className: 'cs-panel-item__meta' },
					item.change === 'new' ? data.labels.new : data.labels.update,
					' · ',
					item.type
				),
				title
			);
		}

		function styleItem( path, index ) {
			return el(
				'li',
				{ className: 'cs-panel-item', key: 'style-' + index },
				el( 'code', { className: 'cs-panel-style-path' }, path )
			);
		}

		function settingItem( item, index ) {
			return el(
				'li',
				{ className: 'cs-panel-item', key: 'setting-' + index },
				el( 'span', { className: 'cs-panel-setting-label' }, item.label ),
				item.value
					? el( 'span', { className: 'cs-panel-setting-value' }, item.value )
					: null
			);
		}

		function App() {
			var state = useState( false );
			var isOpen = state[ 0 ];
			var setOpen = state[ 1 ];

			useEffect( function () {
				function openPanel( event ) {
					event.preventDefault();
					trigger.setAttribute( 'aria-expanded', 'true' );
					setOpen( true );
				}
				trigger.addEventListener( 'click', openPanel );
				return function () {
					trigger.removeEventListener( 'click', openPanel );
				};
			}, [] );

			function closePanel() {
				setOpen( false );
				trigger.setAttribute( 'aria-expanded', 'false' );
				window.requestAnimationFrame( function () {
					trigger.focus();
				} );
			}

			if ( ! isOpen ) {
				return null;
			}

			var changeCount =
				data.content.length + data.styles.length + data.settings.length;
			var status = data.labels[ data.status ] || data.status;

			return el(
				Modal,
				{
					title: data.title,
					onRequestClose: closePanel,
					className: 'cs-changeset-panel-frame',
					overlayClassName: 'cs-changeset-panel-overlay',
					closeButtonLabel: data.labels.close,
				},
				el(
					'div',
					{ className: 'cs-panel-summary' },
					el(
						'span',
						{ className: 'cs-panel-status' },
						data.labels.status,
						': ',
						status
					),
					el(
						'span',
						{ className: 'cs-panel-total' },
						String( changeCount ),
						' ',
						changeCount === 1
							? data.labels.changeOne
							: data.labels.changeMany
					)
				),
				changeCount
					? [
							section( data.labels.content, data.content, contentItem ),
							section( data.labels.styles, data.styles, styleItem ),
							section( data.labels.settings, data.settings, settingItem ),
					  ]
					: el( 'p', { className: 'cs-panel-empty' }, data.labels.empty ),
				el(
					'div',
					{ className: 'cs-panel-footer' },
					el(
						Button,
						{
							href: data.previewUrl,
							variant: 'secondary',
							__next40pxDefaultSize: true,
						},
						data.labels.preview
					)
				)
			);
		}

		wp.element.createRoot( mount ).render( el( App ) );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init, { once: true } );
	} else {
		init();
	}
} )();
