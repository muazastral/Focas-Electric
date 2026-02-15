<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MediaAsset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function index()
    {
        return MediaAsset::query()->latest('id')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => ['required', 'file', 'max:10240', 'mimes:jpg,jpeg,png,webp,gif,svg,pdf'],
            'altText' => ['nullable', 'string', 'max:255'],
        ]);

        $file = $validated['file'];
        $safeOriginal = preg_replace('/[^A-Za-z0-9._-]/', '-', $file->getClientOriginalName()) ?: 'file';
        $filename = now()->format('YmdHis') . '-' . Str::uuid() . '-' . $safeOriginal;
        $path = $file->storeAs('media', $filename, 'public');

        $asset = MediaAsset::create([
            'filename' => $filename,
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getClientMimeType() ?? 'application/octet-stream',
            'size_bytes' => $file->getSize() ?? 0,
            'disk' => 'public',
            'path' => $path,
            'url' => Storage::disk('public')->url($path),
            'alt_text' => $validated['altText'] ?? null,
        ]);

        return response()->json($asset, 201);
    }

    public function destroy(MediaAsset $media)
    {
        Storage::disk($media->disk)->delete($media->path);
        $media->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
