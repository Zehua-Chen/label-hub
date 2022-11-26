import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, act } from '@testing-library/react';
import UploadButton from '.';

describe('UploadButton', () => {
  it('upload', async () => {
    const user = userEvent.setup();
    const file = new File(['hello'], 'test.png');
    const onChange = jest.fn();

    render(<UploadButton onChange={onChange}>Upload Test</UploadButton>);

    await act(async () => {
      await waitFor(() => {
        user.upload(screen.getByTestId('input-upload'), file);
      });
    });

    await user.click(screen.getByText('Upload Test'));

    expect(onChange).toHaveBeenCalledWith(file);
  });
});
