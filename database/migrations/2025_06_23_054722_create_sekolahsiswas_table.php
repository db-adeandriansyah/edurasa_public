<?php

use App\Models\School;
use App\Models\Siswa;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sekolahsiswas', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Siswa::class);
            $table->foreignIdFor(School::class);
            $table->string('nis')->nullable();
            $table->date('start_at')->nullable();
            $table->date('end_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sekolahsiswas');
    }
};
