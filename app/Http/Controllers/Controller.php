<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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
    public function get_wagon(Request $request,$station_id)
    {
        return Wagon::all()->where('station_id',$station_id);
    }
    public function create_train(Request $request)
    {
        
    }
    public function create_shipment(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'order_id' => 'required',
            'train_id' => 'required',
            'route_id' =>'required',
            'time-span' => 'required',
            'departure' => 'required',
            'status' => 'required',
            'creator_id' => 'required'
    ]);
    }
    public function simulator()
    {
        return view('rtc_simulator_view');
    }
}
