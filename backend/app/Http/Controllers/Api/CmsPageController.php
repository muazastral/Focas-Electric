<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CmsPage;
use Illuminate\Http\Request;

class CmsPageController extends Controller
{
    public function index()
    {
        return CmsPage::query()->latest('updated_at')->get();
    }

    public function show(string $slug)
    {
        return CmsPage::query()->where('slug', $slug)->firstOrFail();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:cms_pages,slug'],
            'status' => ['nullable', 'in:draft,published'],
            'sections' => ['nullable', 'array'],
        ]);

        $page = CmsPage::create([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'status' => $validated['status'] ?? 'draft',
            'sections' => $validated['sections'] ?? [],
        ]);

        return response()->json($page, 201);
    }

    public function update(Request $request, CmsPage $page)
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'slug' => ['sometimes', 'string', 'max:255', 'unique:cms_pages,slug,' . $page->id],
            'status' => ['nullable', 'in:draft,published'],
            'sections' => ['nullable', 'array'],
        ]);

        $page->update([
            'title' => $validated['title'] ?? $page->title,
            'slug' => $validated['slug'] ?? $page->slug,
            'status' => $validated['status'] ?? $page->status,
            'sections' => array_key_exists('sections', $validated) ? ($validated['sections'] ?? []) : $page->sections,
        ]);

        return response()->json($page->fresh());
    }

    public function destroy(CmsPage $page)
    {
        $page->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
