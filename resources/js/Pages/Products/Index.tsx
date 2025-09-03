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
          {/* Card de Anúncio 1 */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-dashed border-orange-300 rounded-lg shadow-lg hover:shadow-xl overflow-hidden flex flex-col h-full transition-shadow duration-300">
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-200 to-orange-300">
              <div className="w-full h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">📢</div>
                  <div className="text-orange-700 font-bold text-lg">SEU ANÚNCIO AQUI</div>
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-orange-900 mb-2 line-clamp-2">
                Espaço para Anúncio
              </h3>
              <p className="text-orange-700 text-sm mb-3 flex-grow line-clamp-3">
                Faça hoje sua divulgação e alcance milhares de clientes potenciais! Anuncie seus produtos e serviços em nossa plataforma.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-orange-600">
                  A partir de R$ 99,90
                </span>
                <span className="text-sm text-orange-600 bg-orange-200 px-2 py-1 rounded">
                  Disponível
                </span>
              </div>
              <button
                onClick={() => window.open('mailto:contato@exemplo.com?subject=Interesse em Anunciar', '_blank')}
                className="w-full py-2 px-4 rounded-md transition-colors mt-auto font-medium bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700"
              >
                Anuncie Aqui
              </button>
            </div>
          </div>

          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden flex flex-col h-full transition-shadow duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center'}
                  alt={product.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center';
                  }}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    R$ {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Estoque: {product.stock}
                  </span>
                </div>
                <button
                  onClick={() => handleBuyNow(product)}
                  disabled={product.stock === 0}
                  className={`w-full py-2 px-4 rounded-md transition-colors mt-auto font-medium ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                  }`}
                >
                  {product.stock === 0 ? 'Esgotado' : 'Comprar Agora'}
                </button>
              </div>
            </div>
          ))}

          {/* Card de Anúncio 2 */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-dashed border-purple-300 rounded-lg shadow-lg hover:shadow-xl overflow-hidden flex flex-col h-full transition-shadow duration-300">
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-200 to-purple-300">
              <div className="w-full h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">🎯</div>
                  <div className="text-purple-700 font-bold text-lg">DESTAQUE SEU NEGÓCIO</div>
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-purple-900 mb-2 line-clamp-2">
                Espaço para Anúncio
              </h3>
              <p className="text-purple-700 text-sm mb-3 flex-grow line-clamp-3">
                Aumente suas vendas com nossa audiência qualificada! Pacotes promocionais disponíveis para impulsionar seu negócio.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-purple-600">
                  Planos especiais
                </span>
                <span className="text-sm text-purple-600 bg-purple-200 px-2 py-1 rounded">
                  Oferta limitada
                </span>
              </div>
              <button
                onClick={() => window.open('mailto:contato@exemplo.com?subject=Interesse em Planos de Anúncio', '_blank')}
                className="w-full py-2 px-4 rounded-md transition-colors mt-auto font-medium bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700"
              >
                Anuncie Aqui
              </button>
            </div>
          </div>

          {products.slice(3).map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl overflow-hidden flex flex-col h-full transition-shadow duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center'}
                  alt={product.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center';
                  }}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    R$ {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Estoque: {product.stock}
                  </span>
                </div>
                <button
                  onClick={() => handleBuyNow(product)}
                  disabled={product.stock === 0}
                  className={`w-full py-2 px-4 rounded-md transition-colors mt-auto font-medium ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                  }`}
                >
                  {product.stock === 0 ? 'Esgotado' : 'Comprar Agora'}
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
