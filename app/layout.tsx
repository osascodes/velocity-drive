import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VelocityDrive | Exotic & Luxury Car Rentals',
  description: 'Experience premier luxury, sports, and electric car rentals with instant confirmation and zero hidden fees.',
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

