<?php

use Illuminate\Database\Seeder;
use App\Sections;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $data = file_get_contents("database/ways.geojson");
        (array)$geo=json_decode($data,true);
        $counter=0;
        function subArraysToString($ar, $sep = ', ') {
            $str = '';
            foreach ($ar as $val) {
                $str .= implode($sep, $val);
                $str .= $sep;
            }
            $str = rtrim($str, $sep);
            return $str;
        }
        foreach($geo["features"] as $obj)
        {
            $coordsarray="";
            if(is_array($obj["geometry"]["coordinates"][0][0]))
            {
                foreach($obj["geometry"]["coordinates"][0] as $coords)
                {
                    $coordsString=$coords[0].",".$coords[1];
                    $coordsarray=$coordsarray.$coordsString.";";
                    
                }
                (array)$coords_array=explode(';',$coordsarray);
                $coords_array=array_reverse($coords_array);
                unset($coords_array[1]);
                array_values($coords_array);
                $coords_array=array_reverse($coords_array);
                //$removed=array_shift($coords_array);
                //sort($coords_array);
                $first=$coords_array[0];
                $coords_array=array_reverse($coords_array);
                $last=$coords_array[1];
                $coords_array=array_reverse($coords_array);
                $first_exp=explode(',',$first)[0];
                $last_exp=explode(',',$last)[0];
                /*if($first_exp>$last_exp){
                    $coords_array=array_reverse($coords_array);
                }*/
                $coordsarray=implode(";",$coords_array);
                //var_dump($coordsarray);
                Sections::create([
                    'points' => $coordsarray
                ]);
            }
            else{
                
                foreach($obj["geometry"]["coordinates"] as $coords)
                {
                    $coordsString=$coords[0].",".$coords[1];
                    $coordsarray=$coordsarray.$coordsString.";";
                }
                (array)$coords_array=explode(';',$coordsarray);
                $coords_array=array_reverse($coords_array);
                unset($coords_array[1]);
                array_values($coords_array);
                $coords_array=array_reverse($coords_array);
                //$removed=array_shift($coords_array);
                //sort($coords_array);
                $first=$coords_array[0];
                $coords_array=array_reverse($coords_array);
                $last=$coords_array[1];
                $coords_array=array_reverse($coords_array);
                $first_exp=explode(',',$first)[0];
                $last_exp=explode(',',$last)[0];
                /*if($first_exp>$last_exp){
                    $coords_array=array_reverse($coords_array);
                }*/
                $coordsarray=implode(";",$coords_array);
                //var_dump($coordsarray);
                Sections::create([
                    'points' => $coordsarray
                ]);
            }
            

        }
        
    }
}
