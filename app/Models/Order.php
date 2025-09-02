<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'external_id',
        'mercado_pago_preference_id',
        'mercado_pago_payment_id',
        'total_amount',
        'status',
        'customer_email',
        'customer_name',
        'items'
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'items' => 'array'
    ];
}
