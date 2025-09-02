import React from 'react'
import Layout from '../../Components/Layout'
import { Link } from '@inertiajs/react'

interface Order {
  id: number
  external_id: string
  total_amount: number
  customer_name: string
}

interface Props {
  order?: Order
}

export default function Success({ order }: Props) {
  return (
    <Layout title="Pagamento Aprovado">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Pagamento Aprovado!</h2>
            <p className="text-gray-600">Seu pagamento foi processado com sucesso.</p>
          </div>

          {order && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Detalhes do Pedido</h3>
              <p><strong>Pedido:</strong> {order.external_id}</p>
              <p><strong>Cliente:</strong> {order.customer_name}</p>
              <p><strong>Valor:</strong> R$ {typeof order.total_amount === 'string' ? parseFloat(order.total_amount).toFixed(2) : order.total_amount.toFixed(2)}</p>
            </div>
          )}

          <Link
            href="/"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Voltar às Compras
          </Link>
        </div>
      </div>
    </Layout>
  )
}
