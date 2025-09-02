import React, { useState } from 'react'
import Layout from '../../Components/Layout'
import { router, Link } from '@inertiajs/react'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image?: string
  stock: number
}

interface Props {
  products: Product[]
}

export default function Index({ products }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    quantity: 1
  })

  // Função helper para formatar preço de forma segura
  const formatPrice = (price: any) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price
    return numPrice ? numPrice.toFixed(2) : '0.00'
  }

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedProduct) return

    router.post('/checkout', {
      product_id: selectedProduct.id,
      quantity: customerData.quantity,
      customer_name: customerData.name,
      customer_email: customerData.email
    })
  }

  return (
    <Layout title="Produtos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Nossos Produtos</h2>
          <Link
            href="/test-info"
            className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100"
          >
            🧪 Informações de Teste
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
              <img
                src={product.image || 'https://picsum.photos/300/300?random=999'}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 flex-grow">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    R$ {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Estoque: {product.stock}
                  </span>
                </div>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-auto"
                >
                  Comprar Agora
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Checkout */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Finalizar Compra</h3>

              <div className="mb-4 p-4 bg-gray-50 rounded">
                <h4 className="font-semibold">{selectedProduct.name}</h4>
                <p className="text-gray-600">R$ {formatPrice(selectedProduct.price)}</p>
              </div>

              <form onSubmit={handleCheckout}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    required
                    value={customerData.name}
                    onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seu Email
                  </label>
                  <input
                    type="email"
                    required
                    value={customerData.email}
                    onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={selectedProduct.stock}
                    required
                    value={customerData.quantity}
                    onChange={(e) => setCustomerData({...customerData, quantity: parseInt(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Pagar com Mercado Pago
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
