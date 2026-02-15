<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;

class AdminController extends Controller
{
    public function users()
    {
        return User::query()
            ->latest('id')
            ->get()
            ->map(fn (User $user) => [
                'id' => (string) $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'phone' => $user->phone,
                'address' => $user->address,
                'avatar' => $user->avatar,
            ]);
    }

    public function orders()
    {
        return Order::query()
            ->with('items')
            ->latest('id')
            ->get()
            ->map(fn (Order $order) => [
                'id' => 'ORD-' . str_pad((string) $order->id, 3, '0', STR_PAD_LEFT),
                'userId' => (string) $order->user_id,
                'customerName' => $order->customer_name,
                'date' => $order->date,
                'total' => (float) $order->total,
                'status' => $order->status,
                'items' => $order->items->map(fn ($item) => [
                    'productId' => (string) $item->product_id,
                    'productName' => $item->product_name,
                    'quantity' => (int) $item->quantity,
                    'price' => (float) $item->price,
                ])->values(),
            ]);
    }
}
