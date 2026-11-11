import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'VelocityDrive | Exotic & Luxury Car Rentals',
  description: 'Experience premier luxury, sports, and electric car rentals with instant confirmation and zero hidden fees.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-obsidian-900 text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
