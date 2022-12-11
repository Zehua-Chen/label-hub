import * as React from 'react';
import { useState, useEffect, MouseEvent, useReducer } from 'react';
import { navigate } from 'gatsby';
import produce from 'immer';
import ProtectedRoute from 'src/components/ProtectedRoute';
import Layout from 'src/components/Layout';
import Navbar from 'src/components/Navbar';
import UploadButton from 'src/components/UploadButton';
import { authRouteGuard } from 'src/services/auth';

interface TagsState {
  readonly tags: readonly string[];
  readonly newTag: string;
}

interface TagsActionSetTags {
  type: 'setTags';
  tags: string[];
}

interface TagsActionSetNewTag {
  type: 'setNewTag';
  newTag: string;
}

interface TagsActionAddNewTag {
  type: 'addNewTag';
}

interface TagsActionDeleteTag {
  type: 'deleteTag';
  index: number;
}

type TagsAction =
  | TagsActionSetTags
  | TagsActionSetNewTag
  | TagsActionAddNewTag
  | TagsActionDeleteTag;

function tagsReducer(state: TagsState, action: TagsAction): TagsState {
  switch (action.type) {
    case 'setTags': {
      return produce(state, (draft) => {
        draft.tags = action.tags;
      });
    }
    case 'setNewTag': {
      return produce(state, (draft) => {
        draft.newTag = action.newTag;
      });
    }
    case 'addNewTag': {
      return produce(state, (draft) => {
        draft.tags.push(draft.newTag);
        draft.newTag = '';
      });
    }
    case 'deleteTag': {
      return produce(state, (draft) => {
        draft.tags.splice(action.index, 1);
      });
    }
    default:
      return state;
  }
}

function Upload(): JSX.Element {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState('');

  const [tagsState, tagsDispatch] = useReducer(tagsReducer, {
    tags: [],
    newTag: '',
  });

  useEffect(() => {
    if (!image) {
      return;
    }

    const url = URL.createObjectURL(image);
    setImageURL(url);

    // TODO: use tags from backend for production
    tagsDispatch({ type: 'setTags', tags: ['tag1', 'tag2'] });

    return () => URL.revokeObjectURL(url);
  }, [image]);

  function onUploadChange(file: File) {
    setImage(file);
  }

  function onSaveClick(event: MouseEvent) {
    event.preventDefault();
    navigate('/app/producer/');
  }

  function onTagDelete(e: MouseEvent, index: number) {
    e.preventDefault();
    tagsDispatch({ type: 'deleteTag', index });
  }

  function onAddTagClick(e: MouseEvent) {
    e.preventDefault();
    tagsDispatch({ type: 'addNewTag' });
  }

  return (
    <ProtectedRoute condition={authRouteGuard()}>
      <Layout navigation={<Navbar title='Upload'></Navbar>}>
        <form className='container-fluid'>
          <div className='row'>
            <div className='col-8'>
              <img className='img-fluid' src={imageURL} />
            </div>
            <div className='col'>
              <ul>
                {tagsState.tags.map((tag, index) => (
                  <li key={index}>
                    <span>{tag}</span>
                    <button
                      className='btn btn-primary'
                      onClick={(e) => onTagDelete(e, index)}
                      data-testid={`delete-${tag}`}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <div>
                <label htmlFor='newTag' className='form-label'>
                  New Tag
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='newTag'
                  data-testid='newTag'
                  value={tagsState.newTag}
                  onChange={(e) =>
                    tagsDispatch({ type: 'setNewTag', newTag: e.target.value })
                  }
                />
              </div>
              <button className='btn btn-primary' onClick={onAddTagClick}>
                Add Tag
              </button>
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col-8 d-grid'>
              {!image ? (
                <UploadButton onChange={onUploadChange}>Upload</UploadButton>
              ) : null}
              {image ? (
                <button className='btn btn-primary' onClick={onSaveClick}>
                  Save
                </button>
              ) : null}
            </div>
          </div>
        </form>
      </Layout>
    </ProtectedRoute>
  );
}

export default Upload;
