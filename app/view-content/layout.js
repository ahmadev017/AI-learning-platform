import React from 'react';
import ContentProvider from '@/app/view-content/Provider';

export default function Layout({ children }) {
  return (
    <ContentProvider>
      <div className="min-h-screen">{children}</div>
    </ContentProvider>
  );
}
