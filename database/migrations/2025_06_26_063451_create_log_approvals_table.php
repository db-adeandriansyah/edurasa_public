<?php

use App\Enums\ApprovalEnum;
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
        Schema::create('log_approvals', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('status',array_column(ApprovalEnum::cases(),'value'))->default(ApprovalEnum::PENDING->value);
            $table->string('description')->nullable();
            // ini bisa diisi url/ id file drive
            $table->string('evidence_url')->nullable();
            // ini diisi oleh mimetype file
            $table->string('evidence_type')->nullable();
            // ini diisi oleh sumber file, misal: google drive, storage, dll
            $table->string('evidence_source')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_approvals');
    }
};
