@extends('layouts.app')
@push('styles')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/css/ol.css" type="text/css">
<link href="{{asset('css/rtc_simulator.css')}}" rel="stylesheet">
@endpush
@push('scripts')
<script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/build/ol.js" defer></script>
<script src="{{asset('js/map.js')}}" defer></script>
@endpush
@section('content')
<div class="container">
    <div class="card">
        <div class="card-body">
        <label for="orders">Rendelás kiválasztása</label>
                    <select  id="orders" class ="orders js-example-basic-single" name="orders[]" >
                        @foreach($shipment as $ship)
                        <option value="{{$ship->id}}">{{$ship->id}}</option>
                        @endforeach
                    </select>
                    <button id="ok">OK</button>
            <div id="map" class="map"></div>
            <label for="speed">
            speed:&nbsp;
            <input id="speed" type="range" min="1" max="10" step="1" value="3">
            </label>
            <button id="start-animation" >Start Animation</button>
        </div>
    </div>
</div>
@endsection