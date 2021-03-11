<?php

use Illuminate\Database\Seeder;

use App\Sections;
use App\Stations;
use App\Routes;

use Illuminate\Support\Facades\DB;
class RouteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $station1=Stations::find(589);
        $station2=Stations::find(28);
        
        $start_station_id = $station1->id;
        $end_station_id = $station2->id;
        $start_station_long=$station1->longitude;
        $start_station_lat=$station1->latitude; 
        $end_station_long=$station2->longitude;
        $end_station_lat=$station2->latitude;

        $sections="";
        $complete_flag=0;
        
        $start_section=DB::table('sections')->where('points', "Like", $start_station_long.",".$start_station_lat."%")->get();
        $end_section=DB::table('sections')->where('points', "Like", "%".$end_station_long.",".$end_station_lat."%")->get();
        //var_dump($end_section);
        $start_section_id=6785;
        $end_section_id=$end_section[0]->id;
        $last_section_id=$start_section_id;
        //var_dump($start_section);
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
                if(str_contains($sections,$find_section->id))
                {
                    array_pop($reverse_array);
                    $find_section=end($reverse_array);
                }
            }
            else{
                $find_section=end($find_section_array);
                if(str_contains($sections,$find_section->id))
                {
                    array_pop($find_section_array);
                    $find_section=end($find_section_array);
                }
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
            

            var_dump($sections);
        }
        var_dump($sections);
        $route=Routes::create([
            'section_ids' => $sections,
            'starting_station_id' => $start_station_id,            
            'ending_station_id' => $end_station_id,

        ]);

    }
}
