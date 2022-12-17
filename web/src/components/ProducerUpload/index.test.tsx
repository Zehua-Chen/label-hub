import React from 'react';
jest.mock('gatsby');

import { navigate } from 'gatsby';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import ProducerUpload from '.';
import { getInputElement } from 'src/components/UploadButton/test-utils';

Object.defineProperty(globalThis, 'URL', {
  value: {
    createObjectURL: jest.fn(() => ''),
    revokeObjectURL: jest.fn(),
  },
});

describe('Upload', () => {
  it('Save', async () => {
    const user = userEvent.setup();
    const file = new File(['hello'], 'test.png');

    render(<ProducerUpload />);

    await act(async () => {
      await user.upload(getInputElement(), file);
      const saveButton = screen.getByText('Save');

      await user.click(saveButton);
    });

    expect(navigate).toHaveBeenCalledWith('/app/producer/');
  });
});

describe('Tags', () => {
  it('Manage Tags', async () => {
    const user = userEvent.setup();
    const file = new File(['hello'], 'test.png');

    render(<ProducerUpload />);

    await act(async () => {
      await user.upload(getInputElement(), file);
    });

    const newTag: HTMLInputElement = screen.getByTestId('newTag');
    const addTag = screen.getByText('Add Tag');

    await act(async () => {
      await user.type(newTag, 'Tag 1');
      await user.click(addTag);
    });

    let tag1s = screen.queryAllByText('Tag 1');

    expect(newTag.value).toBe('');
    expect(tag1s.length).toBe(1);

    await act(async () => {
      await user.type(newTag, 'Tag 2');
      await user.click(addTag);
    });

    expect(newTag.value).toBe('');

    await act(async () => {
      const deletTag = screen.getByTestId('delete-Tag 1');
      await user.click(deletTag);
    });

    tag1s = screen.queryAllByText('Tag 1');
    const tag2s = screen.queryAllByText('Tag 2');

    expect(tag1s.length).toBe(0);
    expect(tag2s.length).toBe(1);
  });
});
