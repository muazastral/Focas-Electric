<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $databaseProducts = Product::query()
            ->latest('id')
            ->get()
            ->map(fn (Product $product) => $this->mapProduct($product));

        $fileProducts = collect($this->getPageCatalogProducts())
            ->reject(fn (array $fileProduct) => $databaseProducts->contains(fn (array $databaseProduct) => strcasecmp($databaseProduct['name'], $fileProduct['name']) === 0));

        return $databaseProducts->concat($fileProducts)->values();
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
            'variants' => ['nullable', 'array'],
            'colors' => ['nullable', 'array'],
            'sizes' => ['nullable', 'array'],
            'lengths' => ['nullable', 'array'],
            'types' => ['nullable', 'array'],
            'choices' => ['nullable', 'array'],
            'modelCodes' => ['nullable', 'array'],
            'inventoryMatrix' => ['nullable', 'array'],
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
            'variants' => $validated['variants'] ?? null,
            'colors' => $validated['colors'] ?? null,
            'sizes' => $validated['sizes'] ?? null,
            'lengths' => $validated['lengths'] ?? null,
            'types' => $validated['types'] ?? null,
            'choices' => $validated['choices'] ?? null,
            'model_codes' => $validated['modelCodes'] ?? null,
            'inventory_matrix' => $validated['inventoryMatrix'] ?? [],
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
            'variants' => ['nullable', 'array'],
            'colors' => ['nullable', 'array'],
            'sizes' => ['nullable', 'array'],
            'lengths' => ['nullable', 'array'],
            'types' => ['nullable', 'array'],
            'choices' => ['nullable', 'array'],
            'modelCodes' => ['nullable', 'array'],
            'inventoryMatrix' => ['nullable', 'array'],
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
            'variants' => $validated['variants'] ?? $product->variants,
            'colors' => $validated['colors'] ?? $product->colors,
            'sizes' => $validated['sizes'] ?? $product->sizes,
            'lengths' => $validated['lengths'] ?? $product->lengths,
            'types' => $validated['types'] ?? $product->types,
            'choices' => $validated['choices'] ?? $product->choices,
            'model_codes' => $validated['modelCodes'] ?? $product->model_codes,
            'inventory_matrix' => $validated['inventoryMatrix'] ?? $product->inventory_matrix,
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
            'image' => $this->resolveCatalogImage($product->name, $product->category, $product->image),
            'description' => $product->description,
            'isNew' => (bool) $product->is_new,
            'isSale' => (bool) $product->is_sale,
            'brand' => $product->brand,
            'availableAt' => $product->available_at ?: ['hq'],
            'variants' => $product->variants ?: [],
            'colors' => $product->colors ?: [],
            'sizes' => $product->sizes ?: [],
            'lengths' => $product->lengths ?: [],
            'types' => $product->types ?: [],
            'choices' => $product->choices ?: [],
            'modelCodes' => $product->model_codes ?: [],
            'inventoryMatrix' => $product->inventory_matrix ?: [],
        ];
    }

    private function getPageCatalogProducts(): array
    {
        static $cached = null;
        if (is_array($cached)) {
            return $cached;
        }

        $path = base_path('../data/pdf_page_products.json');
        if (!file_exists($path)) {
            $cached = [];
            return $cached;
        }

        $decoded = json_decode(file_get_contents($path), true);
        if (!is_array($decoded)) {
            $cached = [];
            return $cached;
        }

        $cached = collect($decoded)
            ->filter(fn ($item) => is_array($item) && !empty($item['name']))
            ->map(function (array $item): array {
                return [
                    'id' => (string) ($item['id'] ?? ('file-' . md5((string) $item['name']))),
                    'name' => (string) ($item['name'] ?? 'Catalog Reference'),
                    'category' => (string) ($item['category'] ?? 'Industrial'),
                    'price' => (float) ($item['price'] ?? 0),
                    'originalPrice' => isset($item['originalPrice']) ? (float) $item['originalPrice'] : null,
                    'rating' => (int) ($item['rating'] ?? 4),
                    'image' => (string) ($item['image'] ?? '/pdf-images/page-001-1.png'),
                    'description' => (string) ($item['description'] ?? 'PDF catalog reference entry.'),
                    'isNew' => (bool) ($item['isNew'] ?? false),
                    'isSale' => (bool) ($item['isSale'] ?? false),
                    'brand' => (string) ($item['brand'] ?? 'Focus Electrical'),
                    'availableAt' => is_array($item['availableAt'] ?? null) ? $item['availableAt'] : ['hq'],
                    'variants' => is_array($item['variants'] ?? null) ? $item['variants'] : [],
                    'colors' => is_array($item['colors'] ?? null) ? $item['colors'] : [],
                    'sizes' => is_array($item['sizes'] ?? null) ? $item['sizes'] : [],
                    'lengths' => is_array($item['lengths'] ?? null) ? $item['lengths'] : [],
                    'types' => is_array($item['types'] ?? null) ? $item['types'] : [],
                    'choices' => is_array($item['choices'] ?? null) ? $item['choices'] : [],
                    'modelCodes' => is_array($item['modelCodes'] ?? null) ? $item['modelCodes'] : [],
                    'inventoryMatrix' => is_array($item['inventoryMatrix'] ?? null) ? $item['inventoryMatrix'] : [],
                ];
            })
            ->values()
            ->all();

        return $cached;
    }

    private function resolveCatalogImage(string $name, string $category, ?string $currentImage): string
    {
        $image = (string) ($currentImage ?? '');
        if (!$this->isPlaceholderImage($image)) {
            return $image;
        }

        $nameTokens = collect(explode(' ', $this->normalizeText($name)))
            ->filter(fn (string $token) => strlen($token) > 2)
            ->values();

        $candidates = collect($this->getPageCatalogProducts())
            ->filter(fn (array $item) => ($item['category'] ?? '') === $category && !empty($item['image']))
            ->values();

        if ($candidates->isEmpty()) {
            return $image;
        }

        $best = $candidates
            ->map(function (array $candidate) use ($nameTokens) {
                $candidateName = $this->normalizeText((string) ($candidate['name'] ?? ''));
                $score = $nameTokens->reduce(function (int $carry, string $token) use ($candidateName) {
                    return $carry + (str_contains($candidateName, $token) ? 1 : 0);
                }, 0);

                return ['candidate' => $candidate, 'score' => $score];
            })
            ->sortByDesc('score')
            ->first();

        if (is_array($best) && ($best['score'] ?? 0) > 0) {
            return (string) ($best['candidate']['image'] ?? $image);
        }

        return (string) ($candidates->first()['image'] ?? $image);
    }

    private function isPlaceholderImage(string $image): bool
    {
        if ($image === '') {
            return true;
        }

        return (bool) preg_match('/picsum\\.photos|via\\.placeholder|dummy/i', $image);
    }

    private function normalizeText(string $value): string
    {
        $normalized = strtolower($value);
        $normalized = preg_replace('/[^a-z0-9\\s]/', ' ', $normalized) ?? '';
        $normalized = preg_replace('/\\s+/', ' ', $normalized) ?? '';

        return trim($normalized);
    }
}
