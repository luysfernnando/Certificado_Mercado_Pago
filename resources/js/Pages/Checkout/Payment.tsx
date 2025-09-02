import React, { useEffect } from 'react'
import Layout from '../../Components/Layout'

interface Order {
  id: number
  external_id: string
  total_amount: number
  customer_name: string
  customer_email: string
}

interface Props {
  order: Order
  preference_id: string
  public_key: string
}

declare global {
  interface Window {
    MercadoPago: any
  }
}

export default function Payment({ order, preference_id, public_key }: Props) {
  useEffect(() => {
    // Carregar SDK do Mercado Pago
    const script = document.createElement('script')
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.onload = () => {
      console.log('MercadoPago SDK loaded')
      console.log('Public Key:', public_key)
      console.log('Preference ID:', preference_id)

      const mp = new window.MercadoPago(public_key, {
        locale: 'pt-BR'
      })

      // Criar botão do Checkout Pro
      mp.checkout({
        preference: {
          id: preference_id
        },
        render: {
          container: '.mercadopago-button',
          label: 'Pagar com Mercado Pago'
        }
      })
    }
    script.onerror = (error) => {
      console.error('Erro ao carregar SDK do MercadoPago:', error)
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [preference_id, public_key])

  return (
    <Layout title="Pagamento">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Finalizar Pagamento</h2>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Resumo do Pedido</h3>
            <p><strong>Pedido:</strong> {order.external_id}</p>
            <p><strong>Cliente:</strong> {order.customer_name}</p>
            <p><strong>Email:</strong> {order.customer_email}</p>
            <p><strong>Total:</strong> R$ {typeof order.total_amount === 'string' ? parseFloat(order.total_amount).toFixed(2) : order.total_amount.toFixed(2)}</p>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Clique no botão abaixo para pagar com Mercado Pago
            </p>
            <div className="mercadopago-button" id="mercadopago-button"></div>

            {/* Fallback caso o botão não carregue */}
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Preference ID: {preference_id}<br />
                Public Key: {public_key?.substring(0, 20)}...
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
