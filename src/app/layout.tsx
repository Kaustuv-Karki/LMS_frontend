import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/../config/siteConfig';
import { Toaster } from '@/components/ui/sonner';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const generalKeywords = [
  'LMS',
  'e-learning',
  'online courses',
  'education',
  'learning management system',
  'virtual classroom',
  'online training',
  'digital education',
  'course management',
  'student portal'
];

const targetAudienceKeywords = [
  'students',
  'educators',
  'teachers',
  'trainers',
  'corporate learners',
  'HR professionals',
  'academic institutions',
  'university students',
  'online instructors',
  'self-learners'
];

const actionKeywords = [
  'enroll',
  'learn',
  'certify',
  'teach',
  'track progress',
  'assess',
  'upload',
  'participate',
  'complete courses',
  'join classes'
];

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [...generalKeywords, ...targetAudienceKeywords, ...actionKeywords],
  creator: 'nearif',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name
  },
  authors: [
    {
      name: 'Eight bit One Byte',
      url: 'https://8bit1byte.com'
    }
  ],
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@lmsapp'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: `${siteConfig.url}/site.webmanifest`
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
      <Toaster />
    </html>
  );
}
