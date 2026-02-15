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
                'name' => 'Panasonic LED Ceiling Light',
                'category' => 'Lighting',
                'price' => 189.00,
                'original_price' => 220.00,
                'rating' => 5,
                'image' => 'https://picsum.photos/600/600?random=101',
                'description' => 'Energy-saving LED ceiling light with adjustable brightness and color temperature.',
                'is_sale' => true,
                'brand' => 'Panasonic',
                'available_at' => ['hq', 'kuantan', 'tas'],
            ],
            [
                'name' => 'Schneider Electric Vivace Switch',
                'category' => 'Switches',
                'price' => 18.50,
                'rating' => 4,
                'image' => 'https://picsum.photos/600/600?random=102',
                'description' => 'Modern minimalistic design switch socket.',
                'is_new' => true,
                'brand' => 'Schneider Electric',
                'available_at' => ['hq', 'batu', 'chukai'],
            ],
            [
                'name' => 'KDK Ceiling Fan 5-Blade',
                'category' => 'Fans',
                'price' => 345.00,
                'original_price' => 380.00,
                'rating' => 5,
                'image' => 'https://picsum.photos/600/600?random=103',
                'description' => 'High-performance 5-blade ceiling fan with remote control.',
                'is_sale' => true,
                'brand' => 'KDK',
                'available_at' => ['hq', 'balok', 'tas', 'batu'],
            ],
            [
                'name' => 'Bosch Cordless Drill Driver',
                'category' => 'Tools',
                'price' => 450.00,
                'rating' => 5,
                'image' => 'https://picsum.photos/600/600?random=105',
                'description' => 'Professional grade cordless drill.',
                'is_new' => true,
                'brand' => 'Bosch',
                'available_at' => ['hq', 'kuantan', 'batu', 'chukai', 'tas', 'balok'],
            ],
        ];

        foreach ($products as $item) {
            Product::updateOrCreate(
                ['name' => $item['name']],
                $item
            );
        }
    }
}
