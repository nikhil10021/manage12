import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../../context/AuthContext';
import { LibraryProvider } from '../../context/LibraryContext';
import AdminPanel from './AdminPanel';

test('shows access denied for non-admin user', () => {
  render(
    <AuthProvider>
      <LibraryProvider>
        <AdminPanel />
      </LibraryProvider>
    </AuthProvider>
  );
  expect(screen.getByText(/access denied/i)).toBeInTheDocument();
});
