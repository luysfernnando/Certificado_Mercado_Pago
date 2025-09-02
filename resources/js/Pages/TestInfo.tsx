import React from 'react'
import Layout from '../Components/Layout'

export default function TestInfo() {
  return (
    <Layout title="Informações de Teste">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🧪 Guia de Teste - Mercado Pago
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Cartões de Teste */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                💳 Cartões de Teste Aprovados
              </h2>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded border">
                  <h3 className="font-semibold text-gray-800">Visa</h3>
                  <p><strong>Número:</strong> 4235647728025682</p>
                  <p><strong>CVV:</strong> 123</p>
                  <p><strong>Validade:</strong> 11/25</p>
                  <p><strong>Nome:</strong> APRO</p>
                </div>

                <div className="bg-white p-4 rounded border">
                  <h3 className="font-semibold text-gray-800">Mastercard</h3>
                  <p><strong>Número:</strong> 5031433215406351</p>
                  <p><strong>CVV:</strong> 123</p>
                  <p><strong>Validade:</strong> 11/25</p>
                  <p><strong>Nome:</strong> APRO</p>
                </div>
              </div>
            </div>

            {/* Cartão Rejeitado */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-800 mb-4">
                ❌ Cartão de Teste Rejeitado
              </h2>

              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold text-gray-800">Cartão Rejeitado</h3>
                <p><strong>Número:</strong> 4009348888881881</p>
                <p><strong>CVV:</strong> 123</p>
                <p><strong>Validade:</strong> 11/25</p>
                <p><strong>Nome:</strong> OTHE</p>
              </div>
            </div>
          </div>

          {/* Usuários de Teste */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              👤 Usuários de Teste
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold text-gray-800">Comprador de Teste</h3>
                <p><strong>Email:</strong> test_user_123456@testuser.com</p>
                <p><strong>Senha:</strong> qatest123</p>
              </div>
            </div>
          </div>

          {/* Passos do Teste */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-4">
              📝 Passos para Testar
            </h2>

            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Escolha um produto e clique em "Comprar"</li>
              <li>Preencha os dados do cliente</li>
              <li>Clique em "Pagar"</li>
              <li>Use um dos cartões de teste acima</li>
              <li>Complete o pagamento</li>
              <li>Verifique o retorno para a página de sucesso</li>
            </ol>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              🛍️ Ir para Loja
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
