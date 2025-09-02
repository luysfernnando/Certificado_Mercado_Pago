import React from 'react'
import { Head } from '@inertiajs/react'

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

export default function Layout({ children, title = 'E-commerce Mercado Pago' }: LayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  E-commerce MP
                </h1>
              </div>
            </div>
          </div>
        </nav>
        <main className="py-8">
          {children}
        </main>
      </div>
    </>
  )
}
