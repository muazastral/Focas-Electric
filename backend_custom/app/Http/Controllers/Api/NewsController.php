<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;

class NewsController extends Controller
{
    public function index()
    {
        return News::query()
            ->latest('id')
            ->get()
            ->map(fn (News $item) => [
                'id' => (string) $item->id,
                'title' => $item->title,
                'date' => $item->date,
                'category' => $item->category,
                'image' => $item->image,
                'content' => $item->content,
            ]);
    }
}
