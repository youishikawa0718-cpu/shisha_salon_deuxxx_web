<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Seat::create([
            'name' => 'カウンター席1',
            'type' => 'counter',
            'capacity' => 2,
            'description' => '夜景が見えるカウンター席',
            'hourly_rate' => 1500.00,
        ]);

        \App\Models\Seat::create([
            'name' => 'ソファ席A',
            'type' => 'sofa',
            'capacity' => 4,
            'description' => 'ゆったりとしたソファ席',
            'hourly_rate' => 2000.00,
        ]);

        \App\Models\Seat::create([
            'name' => 'VIP個室',
            'type' => 'vip',
            'capacity' => 6,
            'description' => 'プライベート個室でゆったりと',
            'hourly_rate' => 3000.00,
        ]);

        \App\Models\Seat::create([
            'name' => 'テラス席',
            'type' => 'terrace',
            'capacity' => 3,
            'description' => '開放的なテラス席',
            'hourly_rate' => 1800.00,
        ]);
    }
}
