<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('items')->insert([
            [
                'name' => 'Spaghetti Bolognese',
                'description' => 'Classic Italian pasta with rich meat sauce.',
                'price' => 12.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Chicken Caesar Salad',
                'description' => 'Grilled chicken with romaine lettuce, croutons, and Caesar dressing.',
                'price' => 9.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Margherita Pizza',
                'description' => 'Traditional pizza with fresh tomatoes, mozzarella, and basil.',
                'price' => 10.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Soup',
                'description' => 'Pumpkin cream soup with pink peppercorn.',
                'price' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Avocado eggs',
                'description' => 'Avocado and Egg Toast.',
                'price' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Hamburger',
                'description' => 'Chicken, Tomato and cheese.',
                'price' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pizza Funghi',
                'description' => 'Tomato, mozarella, mushrooms, and onion.',
                'price' => 12.50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Noodles',
                'description' => 'Ramen noodles with soft boiled egg, shrimp and snow peas.',
                'price' => 7.50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
