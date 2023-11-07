<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;

class StatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Status::insert([
            ['name' => 'Todo', 'color' => 'badge-secondary'],
            ['name' => 'In Progress', 'color' => 'badge-info'],
            ['name' => 'Completed', 'color' => 'badge-success']
        ]);
    }
}
