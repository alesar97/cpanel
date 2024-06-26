<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('orders')->insert([
            [
                'user_id' => 8,
                'item_id' => 8,
                'quantity' => 2,
                'total_price' => 25.98,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'item_id' => 3,
                'quantity' => 1,
                'total_price' => 10.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'item_id' => 2,
                'quantity' => 3,
                'total_price' => 19.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 5,
                'item_id' => 5,
                'quantity' => 2,
                'total_price' => 25.98,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 4,
                'item_id' => 4,
                'quantity' => 1,
                'total_price' => 10.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 7,
                'item_id' => 7,
                'quantity' => 1,
                'total_price' => 9.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
