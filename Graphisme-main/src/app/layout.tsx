import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'
import AnimatedBackground from '@/components/AnimatedBackground'

export const metadata: Metadata = {
  metadataBase: new URL('https://graphisme.electron'),
  title: 'Graphisme by ELECTRON | Là où la créativité rencontre la technologie',
  description: 'Agence digitale intelligente fonctionnant avec une équipe d\'Intelligences Artificielles collaboratives. Design, Développement Web, Marketing Digital, IA au Benin.',
  keywords: ['agence digitale', 'design', 'développement web', 'IA', 'marketing digital', 'Graphisme', 'ELECTRON', 'Benin', 'Cotonou'],
  authors: [{ name: 'Graphisme by ELECTRON' }],
  creator: 'Graphisme by ELECTRON',
  publisher: 'Graphisme by ELECTRON',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://graphisme.electron',
    siteName: 'Graphisme by ELECTRON',
    title: 'Graphisme by ELECTRON | Agence Digitale IA au Benin',
    description: 'Première agence digitale intelligente fonctionnant avec une équipe de 12 agents IA. Services: Design, Développement Web, Mobile, IA, Marketing Digital.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Graphisme by ELECTRON - Agence Digitale IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Graphisme by ELECTRON | Agence Digitale IA',
    description: 'Première agence digitale intelligente avec 12 agents IA. Design, Développement, Marketing Digital.',
    creator: '@electron',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <AnimatedBackground />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
