<?php

use Illuminate\Database\Seeder;
use App\Orders;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(Orders::class);
    }
}
