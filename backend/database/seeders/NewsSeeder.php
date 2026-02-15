<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'title' => 'New Industrial LED Series Arrival',
                'date' => 'Oct 12, 2023',
                'category' => 'Product',
                'image' => 'https://picsum.photos/600/400?random=7',
                'content' => 'Our latest Industrial LED Series is now available with high lumen output and IP66 protection.',
            ],
            [
                'title' => 'Partnership with Schneider Electric',
                'date' => 'Sep 28, 2023',
                'category' => 'Brand',
                'image' => 'https://picsum.photos/600/400?random=8',
                'content' => 'Focus Electrical is now an authorized distributor for selected Schneider Electric products.',
            ],
            [
                'title' => 'Semambu Store Expansion Complete',
                'date' => 'Aug 15, 2023',
                'category' => 'Store',
                'image' => 'https://picsum.photos/600/400?random=9',
                'content' => 'Our HQ expansion is complete, adding more warehouse and a larger showroom area.',
            ],
        ];

        foreach ($items as $item) {
            News::updateOrCreate(
                ['title' => $item['title']],
                $item
            );
        }
    }
}
