import React from 'react';
jest.mock('gatsby');

import { navigate } from 'gatsby';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import ProducerUpload from '.';
import { getInputElement } from 'src/components/UploadButton/test-utils';

describe('Upload', () => {
  it('Save', async () => {
    Object.defineProperty(globalThis, 'URL', {
      value: {
        createObjectURL: jest.fn(() => ''),
        revokeObjectURL: jest.fn(),
      },
    });

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
