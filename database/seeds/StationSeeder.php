<?php

use Illuminate\Database\Seeder;
use App\Stations;
use Doctrine\DBAL\Schema\Schema;

class StationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = file_get_contents("database/stations.geojson");
        (array)$geo=json_decode($data,true);
        $counter=0;
        foreach($geo["features"] as $obj)
        {
            if(is_array($obj["geometry"]["coordinates"][0][0]))
            {
                Stations::create(array(
                    'name' => $obj["properties"]["name"],
                    'longitude' => $obj["geometry"]["coordinates"][0][0][0],
                    'latitude' => $obj["geometry"]["coordinates"][0][0][1]
                ));
            }else{
                Stations::create(array(
                    'name' => $obj["properties"]["name"],
                    'longitude' => $obj["geometry"]["coordinates"][0],
                    'latitude' => $obj["geometry"]["coordinates"][1]
                ));

            }
            
            $counter++; 
        }
    }
}
