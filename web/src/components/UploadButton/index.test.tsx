import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import UploadButton from '.';
import { getInputElement } from './test-utils';

describe('UploadButton', () => {
  it('click triggered', async () => {
    const user = userEvent.setup();
    render(<UploadButton>Upload Test</UploadButton>);

    const input = getInputElement();
    const eventListener = jest.fn();

    await act(async () => {
      input.addEventListener('click', eventListener);
      await user.click(screen.getByText('Upload Test'));
    });

    expect(eventListener).toHaveBeenCalled();
  });

  it('onChange triggered', async () => {
    const user = userEvent.setup();
    const file = new File(['hello'], 'test.png');
    const onChange = jest.fn();

    render(<UploadButton onChange={onChange}>Upload Test</UploadButton>);

    await act(async () => {
      await user.upload(getInputElement(), file);
    });

    expect(onChange).toHaveBeenCalledWith(file);
  });
});
