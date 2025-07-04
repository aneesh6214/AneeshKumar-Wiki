import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Tri Dao - Personal Website',
  description: 'Personal website of Tri Dao, Assistant Professor and AI researcher',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white font-sans">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
