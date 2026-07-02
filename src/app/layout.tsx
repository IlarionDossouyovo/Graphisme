import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Graphisme by ELECTRON | Là où la créativité rencontre la technologie',
  description: 'Agence digitale intelligente fonctionnant avec une équipe d\'Intelligences Artificielles collaboratives. Design, Développement Web, Marketing Digital, IA.',
  keywords: ['agence digitale', 'design', 'développement web', 'IA', 'marketing digital', 'Graphisme', 'ELECTRON'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
