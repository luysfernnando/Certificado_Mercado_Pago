import React from 'react'
import Layout from '../../Components/Layout'
import { Link } from '@inertiajs/react'

export default function Pending() {
  return (
    <Layout title="Pagamento Pendente">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-yellow-600 mb-2">Pagamento Pendente</h2>
            <p className="text-gray-600">Seu pagamento está sendo processado. Aguarde a confirmação.</p>
          </div>

          <Link
            href="/"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </Layout>
  )
}
