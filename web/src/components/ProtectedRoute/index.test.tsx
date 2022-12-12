import React from 'react';
import { render, screen, act } from '@testing-library/react';
import ProtectedRoute from '.';

describe('ProtectedRoute', () => {
  it('render', () => {
    const navigate = jest.fn();

    render(
      <ProtectedRoute condition={() => true} navigate={navigate}>
        <div>Content</div>
      </ProtectedRoute>
    );

    expect(navigate).not.toHaveBeenCalled();
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('fallback', async () => {
    const navigate = jest.fn();

    render(
      <ProtectedRoute
        condition={() => false}
        navigate={navigate}
        fallback='/fallback'
      >
        <div>Content</div>
      </ProtectedRoute>
    );

    expect(navigate).toHaveBeenCalledWith('/fallback');
  });
});
