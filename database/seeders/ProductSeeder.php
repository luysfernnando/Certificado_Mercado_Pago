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
                'name' => 'Smartphone Samsung Galaxy S24 Ultra',
                'description' => 'Smartphone top de linha com câmera de alta qualidade, 512GB, 5G, tela AMOLED 6.8"',
                'price' => 4299.99,
                'image' => 'https://images.unsplash.com/photo-1705585174953-9b2aa8afc174?w=400&h=400&&fit=crop&crop=center',
                'stock' => 10
            ],
            [
                'name' => 'Notebook Dell Inspiron 15',
                'description' => 'Notebook para trabalho e estudos, Intel i7, 16GB RAM, NVMe 512GB, tela 15.6"',
                'price' => 2499.90,
                'image' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center',
                'image' => 'https://plus.unsplash.com/premium_photo-1681702178555-ab53d9f8d912?w=400&h=400&fit=crop&crop=center',
                'stock' => 5
            ],
            [
                'name' => 'Headphone Sony WH-1000XM4',
                'description' => 'Headphone premium com cancelamento de ruído ativo, Bluetooth, bateria 30h',
                'price' => 899.99,
                'image' => 'https://images.unsplash.com/photo-1697055656373-720a6a0e9b4c?w=400&h=400&fit=crop&crop=center',
                'stock' => 15
            ],
            [
                'name' => 'Apple Watch Series 9',
                'description' => 'Relógio inteligente com GPS, monitoramento de saúde, resistente à água',
                'price' => 1799.00,
                'image' => 'https://images.unsplash.com/photo-1708920325933-5988622fe361?w=400&h=400&fit=crop&crop=center',
                'stock' => 8
            ],
            [
                'name' => 'iPad Air 5ª Geração',
                'description' => 'Tablet Apple com chip M1, tela Liquid Retina 10.9", 256GB, compatível com Apple Pencil',
                'price' => 3299.00,
                'image' => 'https://images.unsplash.com/photo-1661340272675-f6829791246e?w=400&h=400&fit=crop&crop=center',
                'stock' => 6
            ],
            [
                'name' => 'Câmera Canon EOS R6',
                'description' => 'Câmera mirrorless profissional, sensor full-frame, 4K, estabilização de imagem',
                'price' => 8999.00,
                'image' => 'https://images.unsplash.com/photo-1599664223846-7b8632bd5aa0?w=400&h=400&fit=crop&crop=center',
                'stock' => 3
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
