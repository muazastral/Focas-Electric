<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->json('variants')->nullable()->after('available_at');
            $table->json('colors')->nullable()->after('variants');
            $table->json('sizes')->nullable()->after('colors');
            $table->json('lengths')->nullable()->after('sizes');
            $table->json('types')->nullable()->after('lengths');
            $table->json('choices')->nullable()->after('types');
            $table->json('model_codes')->nullable()->after('choices');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['variants', 'colors', 'sizes', 'lengths', 'types', 'choices', 'model_codes']);
        });
    }
};
