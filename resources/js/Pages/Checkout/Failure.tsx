import React from 'react'
import Layout from '../../Components/Layout'
import { Link } from '@inertiajs/react'

export default function Failure() {
  return (
    <Layout title="Pagamento Rejeitado">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Pagamento Rejeitado</h2>
            <p className="text-gray-600">Houve um problema com seu pagamento. Tente novamente.</p>
          </div>

          <Link
            href="/"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Tentar Novamente
          </Link>
        </div>
      </div>
    </Layout>
  )
}
