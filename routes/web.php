<?php

use App\Role;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/scheduler', 'Controller@scheduler')->name('rtc_scheduler_view');
Route::get('/simulator', 'Controller@simulator')->name('rtc_simulator_view');
Route::post('/scheduler/order/{id}','Controller@get_order')->name('get_order');
Route::post('/scheduler/wagon/{station_id}','Controller@get_wagon')->name('get_wagon');
Route::post('/scheduler/create_train/{wagon_ids}','Controller@create_train')->name('create_train');
