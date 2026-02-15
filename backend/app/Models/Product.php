<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'price',
        'original_price',
        'rating',
        'image',
        'description',
        'is_new',
        'is_sale',
        'brand',
        'available_at',
        'variants',
        'colors',
        'sizes',
        'lengths',
        'types',
        'choices',
        'model_codes',
        'inventory_matrix',
    ];

    protected $casts = [
        'available_at' => 'array',
        'variants' => 'array',
        'colors' => 'array',
        'sizes' => 'array',
        'lengths' => 'array',
        'types' => 'array',
        'choices' => 'array',
        'model_codes' => 'array',
        'inventory_matrix' => 'array',
        'is_new' => 'boolean',
        'is_sale' => 'boolean',
        'price' => 'float',
        'original_price' => 'float',
        'rating' => 'integer',
    ];
}
