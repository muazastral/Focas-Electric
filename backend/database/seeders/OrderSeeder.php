<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $john = User::where('email', 'user@gmail.com')->first();
        $sarah = User::where('email', 'sarah@yahoo.com')->first();

        if (!$john || !$sarah) {
            return;
        }

        $productA = Product::where('name', 'Panasonic LED Ceiling Light')->first();
        $productB = Product::where('name', 'Bosch Cordless Drill Driver')->first();

        $order1 = Order::updateOrCreate(
            ['user_id' => $john->id, 'date' => '2023-10-15'],
            [
                'customer_name' => $john->name,
                'total' => 367.50,
                'status' => 'Delivered',
            ]
        );

        if ($productA) {
            $order1->items()->updateOrCreate(
                ['product_id' => $productA->id],
                [
                    'product_name' => $productA->name,
                    'quantity' => 2,
                    'price' => 183.75,
                ]
            );
        }

        $order2 = Order::updateOrCreate(
            ['user_id' => $sarah->id, 'date' => '2023-11-05'],
            [
                'customer_name' => $sarah->name,
                'total' => 900.00,
                'status' => 'Pending',
            ]
        );

        if ($productB) {
            $order2->items()->updateOrCreate(
                ['product_id' => $productB->id],
                [
                    'product_name' => $productB->name,
                    'quantity' => 2,
                    'price' => 450.00,
                ]
            );
        }
    }
}
