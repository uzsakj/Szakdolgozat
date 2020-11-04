<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Orders;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/
 $model = User::class;

$factory->define(Orders::class, function (Faker $faker) {
    return [
        'ordered_products' => $faker->random_int(1,5),
        'ordered_quantities' => $faker->random_int(1000,5000),
        'deadline' => $faker->date_format('YYYY-MM-DD',now()),
        'starting_station_id' => $faker->random_int(1,20),
        'destination_station_id' => $faker->random_int(1,20),
    ];
});