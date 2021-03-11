<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Types;
use App\Stations;
use App\Orders;
use App\Wagon;
use App\Routes;
use App\Shipment;
use App\Train;
use App\Sections;
use Illuminate\Support\Facades\DB;

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
    public function get_station_name_by_id(Request $request,$id)
    {
        return Stations::find($id)->name;
    }
    public function get_wagon_quantity(Request $request,$station_id)
    {

        $wagons=Wagon::all()->where('station_id',$station_id)->where('type_id',$request->type_id);
        $count=count($wagons);
        return $count;
    }
    public function create_train(Request $request,$wagon_ids)
    {

        $train=Train::create([
            'wagon_ids' => $wagon_ids,
            'pos_x' => 10,
            'pos_y' => 10,
        ]);
 
        return $train->id;

    }
    public function wagon_paired(Request $request,$train_id)
    {
        $train=Wagon::find($request->wagon_id);
        $train->station_id=NULL;
        $train->train_id=intval($train_id);
        $train->save();
        return $train;
    }
    public function get_route(Request $request)
    {
        $route=Routes::all()->where('starting_station_id',$request->first_station_id)->where('ending_station_id',$request->last_station_id)->first();
       if($route==null)
       {
        $request = new Request([
            'first_station_id'=> $request->first_station_id,
            'last_station_id' => $request->last_station_id,
        ]) ;
        
        $route=$this->construct_route($request);
        return $route;
       }
        
        return $route->id;
    }
    public function construct_route(Request $request){
        $station1=Stations::find($request->first_station_id);
        $station2=Stations::find($request->last_station_id);
        
        $start_station_id = $station1->id;
        $end_station_id = $station2->id;
        $start_station_long=$station1->longitude;
        $start_station_lat=$station1->latitude; 
        $end_station_long=$station2->longitude;
        $end_station_lat=$station2->latitude;

        $sections="";
        $complete_flag=0;
        
        $start_section=DB::table('sections')->where('points', "Like", "%".$start_station_long.",".$start_station_lat."%")->get();
        $end_section=DB::table('sections')->where('points', "Like", "%".$end_station_long.",".$end_station_lat."%")->get();
        
        $start_section_id=6785;
        $end_section_id=$end_section[0]->id;
        $last_section_id=$start_section_id;
        $points=explode(';',$start_section[0]->points);
        array_pop($points);
        $search_point=end($points);
        while($complete_flag==0)
        {
            $find_section_array=DB::table('sections')->where('points', "Like", "%".$search_point."%")->get();
            $find_section_array=$find_section_array->toArray();
            $reverse_array=array_reverse($find_section_array);
            $first_elemet=end($reverse_array);
            if($first_elemet->id!=$last_section_id)
            {
                $find_section=end($reverse_array);
            }
            else{
                $find_section=end($find_section_array);
            }
            $find_section_id=$find_section->id;
            $sections=$sections.$find_section_id.",";
            $last_section_id=$find_section_id;
            $find_section_points=explode(';',$find_section->points);
            array_pop($find_section_points);
            $reverse_find_section_points=array_reverse($find_section_points);
            $search_point=end($reverse_find_section_points);
            if($find_section_id == $end_section_id)
            {
                $complete_flag=1;
            }
        }
        $route=Routes::create([
            'section_ids' => $sections,
            'starting_station_id' => $start_station_id,            
            'ending_station_id' => $end_station_id,

        ]);

        return $route->id;
    }
    public function test()
    {
        $request = new Request([
            'first_station_id'=> 589,
            'last_station_id' => 16,
        ]) ;
        return $this->construct_route($request);
    }
    public function create_shipment(Request $request)
    {
        $shipment = Shipment::create([
            'order_id' => $request->order_id,
            'train_id' => $request->train_id,
            'route_id' => $request->route_id,
            'time-span' => $request->time_span,
            'departure' => $request->departure,
            'status' => $request->status,
            'creator_id' => Auth::user()->id,
            ]);

        return $shipment->id;
        
    }
    public function simulator()
    {
        $orders = Orders::all();
        $routes = Routes::all();
        $sections = Sections::all();
        $shipment = Shipment::all();
        return view('rtc_simulator_view',['orders' => $orders,'routes' => $routes,'sections' => $sections,'shipment' => $shipment]);
    }
    public function get_shipment(Request $request,$id)
    {
        $shipment= Shipment::find($id);
        return $shipment;
    }

    public function get_route_sections(Request $request,$id)
    {
        $route = Routes::find($id);
        return $route->section_ids;
    }
    public function get_sections(Request $request,$id)
    {
        $section= Sections::find($id);
        $points=$section->points;
        $points_array=explode(';',$points);
        array_pop($points_array);
        $points_array_reversed=array_reverse($points_array);
        $points_reversed=implode(';',$points_array_reversed);
        return $points_reversed;
    }
}
