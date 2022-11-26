import { screen } from '@testing-library/react';

/**
 * Get the input element of upload button
 * @returns
 */
export function getInputElement(): HTMLElement {
  return screen.getByTestId('input-upload');
}
