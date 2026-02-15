<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function mine(Request $request)
    {
        return Order::query()
            ->with('items')
            ->where('user_id', $request->user()->id)
            ->latest('id')
            ->get()
            ->map(fn (Order $order) => $this->mapOrder($order));
    }

    private function mapOrder(Order $order): array
    {
        return [
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
        ];
    }
}
