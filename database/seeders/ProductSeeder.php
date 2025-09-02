<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Smartphone Samsung Galaxy',
                'description' => 'Smartphone top de linha com câmera de alta qualidade',
                'price' => 1299.99,
                'image' => 'https://picsum.photos/300/300?random=1',
                'stock' => 10
            ],
            [
                'name' => 'Notebook Dell Inspiron',
                'description' => 'Notebook para trabalho e estudos',
                'price' => 2499.90,
                'image' => 'https://picsum.photos/300/300?random=2',
                'stock' => 5
            ],
            [
                'name' => 'Headphone Sony WH-1000XM4',
                'description' => 'Headphone com cancelamento de ruído',
                'price' => 899.99,
                'image' => 'https://picsum.photos/300/300?random=3',
                'stock' => 15
            ],
            [
                'name' => 'Smartwatch Apple Watch',
                'description' => 'Relógio inteligente com GPS e monitoramento de saúde',
                'price' => 1799.00,
                'image' => 'https://picsum.photos/300/300?random=4',
                'stock' => 8
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
