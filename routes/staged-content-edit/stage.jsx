import apiFetch from '@wordpress/api-fetch';
import { BlockCanvas, BlockEditorProvider, BlockInspector } from '@wordpress/block-editor';
import { registerCoreBlocks } from '@wordpress/block-library';
import { getBlockType, parse, serialize } from '@wordpress/blocks';
import { Button, Notice, Spinner, TextareaControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Link, useParams } from '@wordpress/route';
import { Card, InputControl } from '@wordpress/ui';
import '../changesets-home/style.scss';
import './style.scss';

if ( ! getBlockType( 'core/paragraph' ) ) {
  registerCoreBlocks();
}

const StagedEditor = ( { initialItem, changesetId } ) => {
  const [ item, setItem ] = useState( initialItem );
  const [ title, setTitle ] = useState( initialItem.title );
  const [ excerpt, setExcerpt ] = useState( initialItem.excerpt );
  const [ blocks, setBlocks ] = useState( () => parse( initialItem.content || '' ) );
  const [ blocksDirty, setBlocksDirty ] = useState( false );
  const [ busy, setBusy ] = useState( false );
  const [ error, setError ] = useState( '' );
  const [ message, setMessage ] = useState( '' );

  const dirty = blocksDirty || title !== item.title || excerpt !== item.excerpt;
  const updateBlocks = ( nextBlocks ) => {
    setBlocks( nextBlocks );
    setBlocksDirty( true );
  };

  const save = async () => {
    if ( ! dirty || busy ) {
      return;
    }
    setBusy( true );
    setError( '' );
    setMessage( '' );
    const data = { revision: item.revision };
    if ( title !== item.title ) {
      data.title = title;
    }
    if ( excerpt !== item.excerpt ) {
      data.excerpt = excerpt;
    }
    if ( blocksDirty ) {
      data.content = serialize( blocks );
    }
    try {
      const saved = await apiFetch( {
        path: `/changesets/v1/workspace/${ changesetId }/content/${ item.id }`,
        method: 'POST',
        data,
      } );
      setItem( saved );
      setTitle( saved.title );
      setExcerpt( saved.excerpt );
      setBlocksDirty( false );
      setMessage( __( 'Saved to this changeset.', 'changesets' ) );
    } catch ( response ) {
      setError( response.message || __( 'Could not save staged content.', 'changesets' ) );
    } finally {
      setBusy( false );
    }
  };

  return <main className="cs-workspace">
    <Link className="cs-workspace__back" to={ `/review/${ changesetId }` }>{ __( '← Back to changeset', 'changesets' ) }</Link>
    <header className="cs-workspace__header">
      <h1>{ __( 'Edit staged content', 'changesets' ) }</h1>
      <p>{ __( 'Your changes stay in this changeset until it is approved and published.', 'changesets' ) }</p>
    </header>
    { error && <Notice status="error" isDismissible={ false }>{ error }</Notice> }
    { message && <Notice status="success" isDismissible={ false }>{ message }</Notice> }
    { ! item.editable ? <Notice status="info" isDismissible={ false }>{ __( 'This changeset is no longer open for editing.', 'changesets' ) }</Notice> : <>
      <Card.Root className="cs-workspace__panel" render={ <section aria-label={ __( 'Staged document', 'changesets' ) } /> }>
        <Card.Header><Card.Title>{ item.post_type }</Card.Title></Card.Header>
        <Card.Content>
          <div className="cs-staged-editor__fields">
            <InputControl label={ __( 'Title', 'changesets' ) } value={ title } onValueChange={ setTitle } />
            { [ 'post', 'page' ].includes( item.post_type ) && <TextareaControl label={ __( 'Excerpt', 'changesets' ) } value={ excerpt } onChange={ setExcerpt } /> }
          </div>
          <div className="cs-staged-editor__surface">
            <BlockEditorProvider value={ blocks } onInput={ updateBlocks } onChange={ updateBlocks } settings={ {} }>
              <div className="cs-staged-editor__canvas"><BlockCanvas height="600px" /></div>
              <aside className="cs-staged-editor__inspector" aria-label={ __( 'Block settings', 'changesets' ) }><BlockInspector /></aside>
            </BlockEditorProvider>
          </div>
        </Card.Content>
      </Card.Root>
      <div className="cs-staged-editor__footer">
        <Button variant="primary" isBusy={ busy } disabled={ ! dirty || busy } onClick={ save }>{ __( 'Save to changeset', 'changesets' ) }</Button>
        <Link to={ `/review/${ changesetId }` }>{ __( 'Review changeset', 'changesets' ) }</Link>
      </div>
    </> }
  </main>;
};

export const stage = () => {
  const { id, stagedId } = useParams( { from: '/review/$id/edit/$stagedId' } );
  const [ item, setItem ] = useState( null );
  const [ error, setError ] = useState( '' );

  useEffect( () => {
    setItem( null );
    setError( '' );
    apiFetch( { path: `/changesets/v1/workspace/${ id }/content/${ stagedId }` } )
      .then( setItem )
      .catch( ( response ) => setError( response.message || __( 'Could not load staged content.', 'changesets' ) ) );
  }, [ id, stagedId ] );

  if ( error ) {
    return <main className="cs-workspace"><Link className="cs-workspace__back" to={ `/review/${ id }` }>{ __( '← Back to changeset', 'changesets' ) }</Link><Notice status="error" isDismissible={ false }>{ error }</Notice></main>;
  }
  if ( ! item ) {
    return <main className="cs-workspace"><Spinner /></main>;
  }
  return <StagedEditor key={ item.id } initialItem={ item } changesetId={ id } />;
};
