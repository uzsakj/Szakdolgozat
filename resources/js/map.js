import ZoomSlider from 'ol/control/ZoomSlider';
//import olControl from 'ol/control';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import View from 'ol/View';

import {
  Circle as CircleStyle,
  Fill,
  Icon,
  Stroke,
  Style,
} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {getVectorContext} from 'ol/render';
import { forEach } from 'lodash';



var okButton = document.getElementById('ok');
okButton.addEventListener('click', getMap, false);

var animating = false;
var speed, now;
var speedInput = document.getElementById('speed');


 function load() {
  var strGeoJsonstart ='{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates": [';
  var strGeoJsonend =' ]}}]}'; 
  var strGeoJson=strGeoJsonstart+strGeoJsonend;
  var route_id;
  var shipment_id;
  var section_ids;
  var points="";
  return new Promise((resolve,reject)=>
  {
    
  $("select option:selected").each(function () {
    shipment_id=this.value;
    $.get("/simulator/get_shipment/" + shipment_id, { '_token': $('meta[name=csrf-token]').attr('content') }).done(function (data) { 
      route_id=data['route_id'];
      $.get("/simulator/get_route_sections/" + route_id, { '_token': $('meta[name=csrf-token]').attr('content') }).done(function (data) { 
        section_ids=data.split(',')
        section_ids.pop();
        var max=section_ids.length;
        var counter=0;
        section_ids.forEach(function (item) {
          $.get("/simulator/get_sections/" + item, { '_token': $('meta[name=csrf-token]').attr('content') }).done(function (data) {
            points=points+data+';';
            counter++;
            if(counter==max)
            {
            console.log(points);
            let temp="";
            points=points.split(';')
            points.pop();
            points.forEach(function (item) {
            temp=temp+("["+item+"],");
            //console.log(temp);
            })
            temp=temp.slice(0, -1);
            temp =strGeoJsonstart+temp+strGeoJsonend;
            console.log("tamp:"+temp);
            var route = new ol.format.GeoJSON().readFeature(JSON.parse(temp).features[0], {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
            })
            //console.log(temp);
            //return route;
            resolve(route);
            }
          })
  
        }
        )
  
        
        
        
       })
     })
     
  
  });
})
}



//console.log(points);
async function getMap(){
      let json=  await load();
      var route = /** @type {ol.geom.LineString} */ (json).getGeometry();
      //console.log("route?")
      //console.log(route);
      var routeCoords = route.getCoordinates();
      //console.log(routeCoords);
      var routeLength = routeCoords.length;
      
      var routeFeature = new Feature({
        type: 'route',
        geometry: route,
      });
      var geoMarker = /** @type Feature<import("../src/ol/geom/Point").default> */ (new Feature(
        {
          type: 'geoMarker',
          geometry: new Point(routeCoords[0]),
        }
      ));
      var startMarker = new Feature({
        type: 'icon',
        geometry: new Point(routeCoords[0]),
      });
      var endMarker = new Feature({
        type: 'icon',
        geometry: new Point(routeCoords[routeLength - 1]),
      });
      
      var styles = {
        'route': new Style({
          stroke: new Stroke({
            width: 6,
            color: [3, 102, 252, 0.8],
          }),
        }),
        'icon': new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: '/favicon.ico',
          }),
        }),
        'geoMarker': new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({color: 'black'}),
            stroke: new Stroke({
              color: 'white',
              width: 2,
            }),
          }),
        }),
      };
      

      
      
      var vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [routeFeature, geoMarker, startMarker, endMarker],
        }),
        style: function (feature) {
          // hide geoMarker if animation is active
          if (animating && feature.get('type') === 'geoMarker') {
            return null;
          }
          return styles[feature.get('type')];
        },
      });
      
      var center =ol.proj.fromLonLat([19.50,47.16]);
      var key = 'VB28UQZPz0n7K0kfbc5i';
      var attributions =
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
        '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
      
      var map = new Map({
        target: document.getElementById('map'),
        view: new View({
          center: center,
          zoom: 7.5,
          minZoom: 2,
          maxZoom: 19,
        }),
        layers: [
          new TileLayer({
            source: new ol.source.OSM(),
          }),
          vectorLayer ],
      });
      map.addControl(new ZoomSlider());
      
      var moveFeature = function (event) {
        var vectorContext = getVectorContext(event);
        var frameState = event.frameState;
      
        if (animating) {
          var elapsedTime = frameState.time - now;
          // here the trick to increase speed is to jump some indexes
          // on lineString coordinates
          var index = Math.round((speed * elapsedTime) / 1000);
      
          if (index >= routeLength) {
            stopAnimation(true);
            return;
          }
      
          var currentPoint = new Point(routeCoords[index]);
          var feature = new Feature(currentPoint);
          vectorContext.drawFeature(feature, styles.geoMarker);
        }
        // tell OpenLayers to continue the postrender animation
        map.render();
      };
    
      function startAnimation() {
        if (animating) {
          stopAnimation(false);
        } else {
          animating = true;
          now = new Date().getTime();
          speed = speedInput.value;
          startButton.textContent = 'Cancel Animation';
          // hide geoMarker
          //geoMarker.setStyle(null);
          // just in case you pan somewhere else
          //map.getView().setCenter(center);
          vectorLayer.on('postrender', moveFeature);
          map.render();
        }
      }
      
      /**
       * @param {boolean} ended end of animation.
       */
      function stopAnimation(ended) {
        animating = false;
        startButton.textContent = 'Start Animation';
      
        // if animation cancelled set the marker at the beginning
        var coord = ended ? routeCoords[routeLength - 1] : routeCoords[0];
        var geometry = geoMarker.getGeometry();
        geometry.setCoordinates(coord);
        //remove listener
        vectorLayer.un('postrender', moveFeature);
      }
      
     
      var startButton = document.getElementById('start-animation');
      startButton.addEventListener('click', startAnimation, false);
    }

 