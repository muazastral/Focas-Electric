<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::query()
            ->latest('id')
            ->get()
            ->map(fn (Product $product) => $this->mapProduct($product));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'originalPrice' => ['nullable', 'numeric'],
            'rating' => ['nullable', 'integer', 'min:0', 'max:5'],
            'image' => ['required', 'string'],
            'description' => ['required', 'string'],
            'isNew' => ['nullable', 'boolean'],
            'isSale' => ['nullable', 'boolean'],
            'brand' => ['required', 'string', 'max:255'],
            'availableAt' => ['nullable', 'array'],
        ]);

        $product = Product::create([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'price' => $validated['price'],
            'original_price' => $validated['originalPrice'] ?? null,
            'rating' => $validated['rating'] ?? 0,
            'image' => $validated['image'],
            'description' => $validated['description'],
            'is_new' => $validated['isNew'] ?? false,
            'is_sale' => $validated['isSale'] ?? false,
            'brand' => $validated['brand'],
            'available_at' => $validated['availableAt'] ?? ['hq'],
        ]);

        return response()->json($this->mapProduct($product), 201);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'category' => ['sometimes', 'string', 'max:255'],
            'price' => ['sometimes', 'numeric'],
            'originalPrice' => ['nullable', 'numeric'],
            'rating' => ['nullable', 'integer', 'min:0', 'max:5'],
            'image' => ['sometimes', 'string'],
            'description' => ['sometimes', 'string'],
            'isNew' => ['nullable', 'boolean'],
            'isSale' => ['nullable', 'boolean'],
            'brand' => ['sometimes', 'string', 'max:255'],
            'availableAt' => ['nullable', 'array'],
        ]);

        $product->update([
            'name' => $validated['name'] ?? $product->name,
            'category' => $validated['category'] ?? $product->category,
            'price' => $validated['price'] ?? $product->price,
            'original_price' => array_key_exists('originalPrice', $validated) ? $validated['originalPrice'] : $product->original_price,
            'rating' => array_key_exists('rating', $validated) ? $validated['rating'] : $product->rating,
            'image' => $validated['image'] ?? $product->image,
            'description' => $validated['description'] ?? $product->description,
            'is_new' => array_key_exists('isNew', $validated) ? $validated['isNew'] : $product->is_new,
            'is_sale' => array_key_exists('isSale', $validated) ? $validated['isSale'] : $product->is_sale,
            'brand' => $validated['brand'] ?? $product->brand,
            'available_at' => $validated['availableAt'] ?? $product->available_at,
        ]);

        return response()->json($this->mapProduct($product->fresh()));
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function mapProduct(Product $product): array
    {
        return [
            'id' => (string) $product->id,
            'name' => $product->name,
            'category' => $product->category,
            'price' => (float) $product->price,
            'originalPrice' => $product->original_price !== null ? (float) $product->original_price : null,
            'rating' => (int) $product->rating,
            'image' => $product->image,
            'description' => $product->description,
            'isNew' => (bool) $product->is_new,
            'isSale' => (bool) $product->is_sale,
            'brand' => $product->brand,
            'availableAt' => $product->available_at ?: ['hq'],
        ];
    }
}
