<?php

use App\Role;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

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
Route::middleware(['auth'])->group(function (){
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/scheduler', 'Controller@scheduler')->name('rtc_scheduler_view');
Route::get('/simulator', 'Controller@simulator')->name('rtc_simulator_view');
Route::post('/scheduler/get_station_name_by_id/{id}', 'Controller@get_station_name_by_id')->name('get_station_name_by_id');
Route::get('/simulator/get_shipment/{id}','Controller@get_shipment')->name('get_shipment');
Route::get('/simulator/get_route_sections/{id}','Controller@get_route_sections')->name('get_route_sections');
Route::get('/simulator/get_sections/{id}','Controller@get_sections')->name('get_sections');
Route::post('/scheduler/order/{id}','Controller@get_order')->name('get_order');
Route::post('/scheduler/get_wagon/{station_id}','Controller@get_wagon_quantity')->name('get_wagon_quantity');
Route::post('/scheduler/wagon_paired/{train_id}','Controller@wagon_paired')->name('wagon_paired');
Route::post('/scheduler/create_train/{wagon_ids}','Controller@create_train')->name('create_train');
Route::post('/scheduler/create_shipment/','Controller@create_shipment')->name('create_shipment');
Route::post('/scheduler/get_route/','Controller@get_route')->name('get_route');
Route::post('/scheduler/construct_route/','Controller@construct_route')->name('construct_route');
Route::get('/test', 'Controller@test')->name('test');
});