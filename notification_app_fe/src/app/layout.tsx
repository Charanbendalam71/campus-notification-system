import type { Metadata } from 'next';
import { Providers } from '../components/Providers';
import { Navbar } from '../components/Navbar';
import { ToastContainer } from '../components/ToastContainer';

export const metadata: Metadata = {
  title: 'Campus Notification System',
  description: 'Manage and view campus notifications',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f4f6f8' }}>
        <Providers>
          <Navbar />
          <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            {children}
          </main>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
