<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CheckoutController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rota principal - lista de produtos
Route::get('/', [ProductController::class, 'index'])->name('products.index');

// Página de informações de teste
Route::get('/test-info', function () {
    return Inertia::render('TestInfo');
})->name('test.info');

// Rotas de produtos
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

// Rotas de checkout
Route::post('/checkout', [CheckoutController::class, 'create'])->name('checkout.create');
Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
Route::get('/checkout/failure', [CheckoutController::class, 'failure'])->name('checkout.failure');
Route::get('/checkout/pending', [CheckoutController::class, 'pending'])->name('checkout.pending');

// Webhook do Mercado Pago
Route::post('/checkout/webhook', [CheckoutController::class, 'webhook'])->name('checkout.webhook');
