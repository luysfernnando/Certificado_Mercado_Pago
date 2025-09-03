<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Exceptions\MPApiException;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    public function __construct()
    {
        // Configurar o SDK do Mercado Pago
        MercadoPagoConfig::setAccessToken(config('services.mercadopago.access_token'));
    }

    public function create(Request $request)
    {
        \Log::info('Checkout create method called', $request->all());

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email'
        ]);

        \Log::info('Validation passed');

        $product = Product::findOrFail($request->product_id);
        \Log::info('Product found', ['product' => $product->toArray()]);

        // Verificar estoque
        if ($product->stock < $request->quantity) {
            return back()->withErrors(['quantity' => 'Estoque insuficiente']);
        }

        // Calcular total
        $totalAmount = $product->price * $request->quantity;

        // Criar pedido
        $order = Order::create([
            'external_id' => 'ORDER-' . Str::upper(Str::random(10)),
            'total_amount' => $totalAmount,
            'status' => 'pending',
            'customer_email' => $request->customer_email,
            'customer_name' => $request->customer_name,
            'items' => [
                [
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'quantity' => $request->quantity,
                    'unit_price' => $product->price,
                    'total_price' => $totalAmount
                ]
            ]
        ]);

        \Log::info('Order created', ['order' => $order->toArray()]);

        // Criar preferência no Mercado Pago
        try {
            \Log::info('Attempting to create MP preference');

            // Configure MP client
            $accessToken = config('services.mercadopago.access_token');
            $integratorId = config('services.mercadopago.integrator_id');

            \Log::info('MP Configuration', [
                'token_prefix' => substr($accessToken, 0, 10) . '...',
                'integrator_id' => $integratorId
            ]);

            MercadoPagoConfig::setAccessToken($accessToken);
            if ($integratorId) {
                MercadoPagoConfig::setIntegratorId($integratorId);
            }
            $client = new PreferenceClient();

            $preferenceData = [
                "items" => [
                    [
                        "id" => (string) $product->id, // ID do produto
                        "title" => $product->name,
                        "description" => $product->description, // Descrição do produto
                        "picture_url" => $product->image, // URL da imagem
                        "quantity" => $request->quantity,
                        "unit_price" => floatval($product->price),
                        "currency_id" => "BRL"
                    ]
                ],
                "payer" => [
                    "name" => $request->customer_name,
                    "email" => $request->customer_email
                ],
                "external_reference" => $order->external_id,
                "payment_methods" => [
                    "excluded_payment_methods" => [
                        ["id" => "account_money"] // Excluir saldo em conta como pedido no exame
                    ],
                    "excluded_payment_types" => [],
                    "installments" => 12 // Máximo de 12 parcelas
                ],
                "back_urls" => [
                    "success" => url('/checkout/success'),
                    "failure" => url('/checkout/failure'),
                    "pending" => url('/checkout/pending')
                ],
                "notification_url" => url('/checkout/webhook') // Reativar webhook para notificações
                // "auto_return" => "approved" // Comentado para evitar validação rigorosa do MP
            ];

            \Log::info('Preference data prepared', $preferenceData);

            $preference = $client->create($preferenceData);

            \Log::info('MP preference created successfully', ['preference_id' => $preference->id]);

            // Salvar ID da preferência
            $order->update([
                'mercado_pago_preference_id' => $preference->id
            ]);

            \Log::info('Order updated with preference_id');

            return Inertia::render('Checkout/Payment', [
                'order' => $order,
                'preference_id' => $preference->id,
                'public_key' => config('services.mercadopago.public_key')
            ]);

        } catch (MPApiException $e) {
            $apiResponse = $e->getApiResponse();
            \Log::error('MP API Exception', [
                'message' => $e->getMessage(),
                'status_code' => $e->getStatusCode(),
                'api_response_content' => $apiResponse ? $apiResponse->getContent() : null
            ]);
            return back()->withErrors(['error' => 'Erro na API do Mercado Pago: ' . $e->getMessage()]);
        } catch (\Exception $e) {
            \Log::error('Error creating MP preference', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return back()->withErrors(['error' => 'Erro ao processar pagamento: ' . $e->getMessage()]);
        }
    }

    public function success(Request $request)
    {
        \Log::info('Success method called', [
            'query_params' => $request->all(),
            'url' => $request->fullUrl()
        ]);

        $collection_id = $request->get('collection_id');
        $payment_id = $request->get('payment_id'); // Payment ID também pode vir aqui
        $external_reference = $request->get('external_reference');
        $collection_status = $request->get('collection_status');
        $payment_type = $request->get('payment_type');

        \Log::info('Processing success', [
            'collection_id' => $collection_id,
            'payment_id' => $payment_id,
            'external_reference' => $external_reference,
            'collection_status' => $collection_status,
            'payment_type' => $payment_type
        ]);

        $order = null;
        if ($external_reference) {
            $order = Order::where('external_id', $external_reference)->first();
            if ($order) {
                $order->update([
                    'status' => 'paid',
                    'mercado_pago_payment_id' => $payment_id ?: $collection_id,
                    'payment_status' => $collection_status,
                    'payment_type' => $payment_type
                ]);
                \Log::info('Order updated to paid', [
                    'order_id' => $order->id,
                    'payment_id' => $payment_id ?: $collection_id
                ]);
            }
        }

        return Inertia::render('Checkout/Success', [
            'order' => $order,
            'payment_id' => $payment_id ?: $collection_id // Passar payment_id para o frontend
        ]);
    }

    public function failure(Request $request)
    {
        return Inertia::render('Checkout/Failure');
    }

    public function pending(Request $request)
    {
        return Inertia::render('Checkout/Pending');
    }

    public function webhook(Request $request)
    {
        \Log::info('Mercado Pago Webhook received', [
            'headers' => $request->headers->all(),
            'body' => $request->all(),
            'raw_body' => $request->getContent()
        ]);

        $data = $request->all();

        // Processar notificação de pagamento
        if (isset($data['type']) && $data['type'] === 'payment') {
            $payment_id = $data['data']['id'] ?? null;

            if ($payment_id) {
                \Log::info('Payment notification received', [
                    'payment_id' => $payment_id,
                    'action' => $data['action'] ?? null
                ]);

                // Aqui você pode implementar consulta à API do MP para obter detalhes do pagamento
                // e atualizar o status do pedido baseado no external_reference
            }
        }

        return response()->json(['status' => 'ok'], 200);
    }
}
