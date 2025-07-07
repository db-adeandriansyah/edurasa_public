<?php

namespace Database\Factories;

use App\Enums\ApprovalEnum;
use App\Models\LogApproval;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
    /**
     * Configure the factory with additional settings.
     */
    public function configure(): static 
    {
        return $this->afterCreating(function (User $user) {
            // Additional actions after creating a user can be added here.
            LogApproval::create([
                'user_id' => $user->id,
                'description' => 'Pertama kali membuat akun',
                'status' => ApprovalEnum::PENDING->value,
                'evidence_url' => null,
                'evidence_type' => null,
                'evidence_source' => null,
            ])  ;
        });
    }   
    /**
     * Assign a specific role to the user after creation.
     */
    public function withRole(string $roleName): static
    {
        return $this->afterCreating(function (User $user) use ($roleName) {
            $user->assignRole($roleName);
        });
    }
}
