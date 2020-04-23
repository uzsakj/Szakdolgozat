<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Types;
use App\Stations;
use App\Orders;
use App\Wagon;
use App\Routes;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function scheduler()
    {
        $types = Types::all();
        $stations = Stations::all();
        $routes = Routes::all();
        $orders = Orders::all();
        $wagons = Wagon::all();
        return view('rtc_scheduler_view',['types' => $types,'stations' => $stations,'routes' => $routes,'orders' => $orders, 'wagons' => $wagons]);
    }
    public function get_order(Request $request,$id)
    {
        return Orders::find($id);
    }
    public function simulator()
    {
        return view('rtc_simulator_view');
    }
}
