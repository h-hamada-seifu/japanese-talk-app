import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/layout';
import './globals.css';

export const metadata: Metadata = {
  title: '日本語リスニング・発音練習',
  description: '日本語超初級者向けリスニング・発音練習アプリ',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50 antialiased">
        <Header />
        <main className="pb-8">{children}</main>
      </body>
    </html>
  );
}
