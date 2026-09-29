import apiFetch from '@wordpress/api-fetch';
import { Button, ColorIndicator, Notice, Spinner } from '@wordpress/components';
import { DataForm, DataViews, filterSortAndPaginate } from '@wordpress/dataviews';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';
import { Link, useParams } from '@wordpress/route';
import { Badge, Card, CollapsibleCard } from '@wordpress/ui';
import '../changesets-home/style.scss';

const statusLabels = {
  open: __( 'Open', 'changesets' ),
  approved: __( 'Approved', 'changesets' ),
  published: __( 'Published', 'changesets' ),
  discarded: __( 'Discarded', 'changesets' ),
};

const statusIntents = {
  open: 'informational',
  approved: 'medium',
  published: 'stable',
  discarded: 'none',
};

const contentFields = [
  { id: 'title', type: 'text', enableGlobalSearch: true, label: __( 'Title', 'changesets' ) },
  { id: 'post_type', type: 'text', enableGlobalSearch: true, label: __( 'Type', 'changesets' ) },
  {
    id: 'change',
    type: 'text',
    label: __( 'Change', 'changesets' ),
    elements: [
      { value: 'new', label: __( 'New', 'changesets' ) },
      { value: 'update', label: __( 'Update', 'changesets' ) },
    ],
  },
];

const initialContentView = {
  type: 'table',
  perPage: 10,
  page: 1,
  search: '',
  filters: [],
  titleField: 'title',
  fields: [ 'post_type', 'change' ],
  layout: { density: 'balanced' },
};

const ThemeJsonValue = ( { value, path } ) => {
  if ( value === undefined ) {
    return <span>{ __( 'Not set', 'changesets' ) }</span>;
  }
  if ( Array.isArray( value ) && path.endsWith( '.palette' ) ) {
    return <span className="cs-workspace__palette-value">
      { sprintf( _n( '%d color', '%d colors', value.length, 'changesets' ), value.length ) }
      <span className="cs-workspace__palette-swatches">
        { value.slice( 0, 8 ).map( ( preset, index ) => preset?.color && <span key={ preset.slug || index } title={ `${ preset.name || preset.slug }: ${ preset.color }` }><ColorIndicator colorValue={ preset.color } /></span> ) }
      </span>
    </span>;
  }
  if ( Array.isArray( value ) ) {
    return <span>{ sprintf( _n( '%d item', '%d items', value.length, 'changesets' ), value.length ) }</span>;
  }
  const full = typeof value === 'string' ? value : JSON.stringify( value );
  return <span title={ full }>{ full.length > 120 ? `${ full.slice( 0, 120 ) }…` : full }</span>;
};

const themeJsonFields = [
  { id: 'path', type: 'text', enableGlobalSearch: true, label: __( 'theme.json path', 'changesets' ) },
  { id: 'current', type: 'text', label: __( 'Current', 'changesets' ), render: ( { item } ) => <ThemeJsonValue value={ item.current_set ? item.current : undefined } path={ item.path } /> },
  { id: 'staged', type: 'text', label: __( 'Staged', 'changesets' ), render: ( { item } ) => <ThemeJsonValue value={ item.staged_set ? item.staged : undefined } path={ item.path } /> },
];

const initialThemeJsonView = {
  type: 'table',
  perPage: 20,
  page: 1,
  search: '',
  filters: [],
  titleField: 'path',
  fields: [ 'current', 'staged' ],
  layout: { density: 'balanced' },
};

const colorFields = [
  { id: 'background', type: 'text', label: __( 'Background color', 'changesets' ), description: __( 'Hex color, for example #ffffff.', 'changesets' ) },
  { id: 'text', type: 'text', label: __( 'Text color', 'changesets' ), description: __( 'Hex color, for example #111111.', 'changesets' ) },
  { id: 'link', type: 'text', label: __( 'Link color', 'changesets' ), description: __( 'Hex color, for example #ff0055.', 'changesets' ) },
];
const colorForm = { layout: { type: 'regular' }, fields: [ 'background', 'text', 'link' ] };
const readColors = ( themeJson ) => ( {
  background: themeJson?.styles?.color?.background || '',
  text: themeJson?.styles?.color?.text || '',
  link: themeJson?.styles?.elements?.link?.color?.text || '',
} );

const StagedStylesForm = ( { item, onSaved } ) => {
  const source = item.theme_json?.staged || item.theme_json?.current;
  const [ original, setOriginal ] = useState( () => readColors( source ) );
  const [ colors, setColors ] = useState( () => readColors( source ) );
  const [ busy, setBusy ] = useState( false );
  const [ error, setError ] = useState( '' );
  const [ message, setMessage ] = useState( '' );

  useEffect( () => {
    const next = readColors( item.theme_json?.staged || item.theme_json?.current );
    setOriginal( next );
    setColors( next );
  }, [ item.theme_json ] );

  const changed = Object.keys( colors ).filter( ( key ) => colors[ key ] !== original[ key ] );
  const save = async () => {
    if ( ! changed.length || busy ) {
      return;
    }
    setError( '' );
    setMessage( '' );
    if ( changed.some( ( key ) => ! /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test( colors[ key ] ) ) ) {
      setError( __( 'Enter a hex color for each changed field.', 'changesets' ) );
      return;
    }
    const styles = {};
    if ( changed.includes( 'background' ) || changed.includes( 'text' ) ) {
      styles.color = {};
      if ( changed.includes( 'background' ) ) {
        styles.color.background = colors.background;
      }
      if ( changed.includes( 'text' ) ) {
        styles.color.text = colors.text;
      }
    }
    if ( changed.includes( 'link' ) ) {
      styles.elements = { link: { color: { text: colors.link } } };
    }
    setBusy( true );
    try {
      const updated = await apiFetch( {
        path: `/changesets/v1/workspace/${ item.id }/styles`,
        method: 'POST',
        data: { styles },
      } );
      onSaved( updated );
      setMessage( __( 'Colors saved to this changeset.', 'changesets' ) );
    } catch ( response ) {
      setError( response.message || __( 'Could not save staged colors.', 'changesets' ) );
    } finally {
      setBusy( false );
    }
  };

  return <div className="cs-workspace__style-editor">
    <h3>{ __( 'Edit staged colors', 'changesets' ) }</h3>
    <p>{ __( 'These site-wide colors are saved only to this changeset.', 'changesets' ) }</p>
    { error && <Notice status="error" isDismissible={ false }>{ error }</Notice> }
    { message && <Notice status="success" isDismissible={ false }>{ message }</Notice> }
    <DataForm data={ colors } fields={ colorFields } form={ colorForm } onChange={ ( edits ) => setColors( ( previous ) => ( { ...previous, ...edits } ) ) } />
    <Button variant="secondary" isBusy={ busy } disabled={ ! changed.length || busy } onClick={ save }>{ __( 'Save colors to changeset', 'changesets' ) }</Button>
  </div>;
};

export const stage = () => {
  const { id } = useParams( { from: '/review/$id' } );
  const [ item, setItem ] = useState( null );
  const [ view, setView ] = useState( initialContentView );
  const [ themeJsonView, setThemeJsonView ] = useState( initialThemeJsonView );
  const [ error, setError ] = useState( '' );
  const [ message, setMessage ] = useState( '' );
  const [ busy, setBusy ] = useState( false );
  const [ failures, setFailures ] = useState( [] );

  useEffect( () => {
    apiFetch( { path: `/changesets/v1/workspace/${ id }` } )
      .then( setItem )
      .catch( ( response ) => setError( response.message || __( 'Could not load changeset.', 'changesets' ) ) );
  }, [ id ] );

  const content = useMemo(
    () => filterSortAndPaginate( item?.content || [], view, contentFields ),
    [ item, view ]
  );

  const themeJsonRows = item?.theme_json_changes || [];
  const themeJsonChanges = useMemo(
    () => filterSortAndPaginate( themeJsonRows, themeJsonView, themeJsonFields ),
    [ themeJsonRows, themeJsonView ]
  );

  const runAction = async ( operation ) => {
    if ( operation === 'publish' && ! window.confirm( __( 'Publish this changeset to the live site?', 'changesets' ) ) ) {
      return;
    }
    setBusy( true );
    setError( '' );
    setMessage( '' );
    setFailures( [] );
    try {
      const response = await apiFetch( {
        path: `/changesets/v1/workspace/${ id }/${ operation }`,
        method: 'POST',
      } );
      setItem( response.changeset );
      if ( response.result?.partial_success ) {
        setError( __( 'Some content could not be published. Resolve the failures, then retry.', 'changesets' ) );
        setFailures( response.result.failed_items || [] );
      } else {
        setMessage( operation === 'approve' ? __( 'Changeset approved.', 'changesets' ) : __( 'Changeset published.', 'changesets' ) );
      }
    } catch ( response ) {
      setError( response.message || __( 'Could not update changeset.', 'changesets' ) );
    } finally {
      setBusy( false );
    }
  };

  return (
    <main className="cs-workspace">
      <Link className="cs-workspace__back" to="/">← { __( 'All changesets', 'changesets' ) }</Link>
      { error && <Notice status="error" isDismissible={ false }>{ error }{ failures.length > 0 && <ul>{ failures.map( ( failure ) => <li key={ failure.staged_id }>{ `${ failure.staged_id }: ${ failure.reason }` }</li> ) }</ul> }</Notice> }
      { message && <Notice status="success" isDismissible={ false }>{ message }</Notice> }
      { ! item ? ( error ? null : <Spinner /> ) : (
        <>
          <header className="cs-workspace__header">
            <h1>{ item.title || __( 'Untitled changeset', 'changesets' ) }</h1>
          </header>
          <div className="cs-workspace__review-layout">
            <Card.Root className="cs-workspace__panel" render={ <section aria-label={ __( 'Staged changes', 'changesets' ) } /> }>
              <Card.Header><Card.Title>{ __( 'Staged changes', 'changesets' ) }</Card.Title></Card.Header>
              <Card.Content>
                { item.content.length > 0 && <DataViews
                  data={ content.data }
                  fields={ contentFields }
                  view={ view }
                  onChangeView={ setView }
                  paginationInfo={ content.paginationInfo }
                  defaultLayouts={ { table: {} } }
                  searchLabel={ __( 'Search staged content', 'changesets' ) }
                  isItemClickable={ () => item.status === 'open' }
                  renderItemLink={ ( { item: staged, ...props } ) => <Link to={ `/review/${ item.id }/edit/${ staged.id }` } { ...props } /> }
                  empty={ <p>{ __( 'No matching staged content.', 'changesets' ) }</p> }
                /> }
                { item.status === 'open' && item.content.length > 0 && <p>{ __( 'Select a staged item to edit it.', 'changesets' ) }</p> }
                { item.settings.length > 0 && <><h3>{ __( 'Settings', 'changesets' ) }</h3><p>{ item.settings.join( ', ' ) }</p></> }
                { item.theme_json && <section className="cs-workspace__theme-json" aria-label={ __( 'Global styles changes', 'changesets' ) }>
                  <h3>{ __( 'Global styles (theme.json)', 'changesets' ) }</h3>
                  { item.theme_json.variation && <p>{ sprintf( __( 'Style variation: %s', 'changesets' ), item.theme_json.variation ) }</p> }
                  <p>{ __( 'These are staged site-wide style overrides. The theme.json file in the theme is unchanged.', 'changesets' ) }</p>
                  { item.theme_json.error && <Notice status="warning" isDismissible={ false }>{ item.theme_json.error }</Notice> }
                  { item.theme_json.staged && <DataViews
                    data={ themeJsonChanges.data }
                    fields={ themeJsonFields }
                    view={ themeJsonView }
                    onChangeView={ setThemeJsonView }
                    paginationInfo={ themeJsonChanges.paginationInfo }
                    defaultLayouts={ { table: {} } }
                    searchLabel={ __( 'Search theme.json changes', 'changesets' ) }
                    empty={ <p>{ __( 'No differences from the current site overrides.', 'changesets' ) }</p> }
                  /> }
                  { item.theme_json.staged && <CollapsibleCard.Root className="cs-workspace__theme-json-source">
                    <CollapsibleCard.Header render={ <h4 /> }><Card.Title>{ __( 'View staged theme.json', 'changesets' ) }</Card.Title></CollapsibleCard.Header>
                    <CollapsibleCard.Content><pre><code>{ JSON.stringify( item.theme_json.staged, null, 2 ) }</code></pre></CollapsibleCard.Content>
                  </CollapsibleCard.Root> }
                </section> }
                { ! item.content.length && ! item.settings.length && ! item.theme_json && <p>{ __( 'No staged changes.', 'changesets' ) }</p> }
              </Card.Content>
            </Card.Root>
            <Card.Root className="cs-workspace__panel" render={ <aside aria-label={ __( 'Review actions', 'changesets' ) } /> }>
              <Card.Header><Card.Title>{ __( 'Review', 'changesets' ) }</Card.Title></Card.Header>
              <Card.Content>
                <p><Badge intent={ statusIntents[ item.status ] || 'none' }>{ statusLabels[ item.status ] || item.status }</Badge></p>
                <div className="cs-workspace__actions">
                  { item.preview_url && <Button variant="secondary" href={ item.preview_url } target="_blank" rel="noopener noreferrer">{ __( 'Preview changeset', 'changesets' ) }</Button> }
                  { item.exit_url && <Button variant="tertiary" href={ item.exit_url }>{ __( 'Exit changeset', 'changesets' ) }</Button> }
                  { item.can_approve && <Button variant="primary" isBusy={ busy } disabled={ busy } onClick={ () => runAction( 'approve' ) }>{ __( 'Approve changeset', 'changesets' ) }</Button> }
                  { item.can_publish && <Button variant="primary" isBusy={ busy } disabled={ busy } onClick={ () => runAction( 'publish' ) }>{ __( 'Publish changeset', 'changesets' ) }</Button> }
                </div>
                { item.can_publish && <p>{ __( 'Publishing applies staged changes to the live site.', 'changesets' ) }</p> }
              </Card.Content>
            </Card.Root>
          </div>
          { item.status === 'open' && <Card.Root className="cs-workspace__styles-card" render={ <section aria-label={ __( 'Edit staged colors', 'changesets' ) } /> }>
            <Card.Content><StagedStylesForm item={ item } onSaved={ setItem } /></Card.Content>
          </Card.Root> }
        </>
      ) }
    </main>
  );
};
