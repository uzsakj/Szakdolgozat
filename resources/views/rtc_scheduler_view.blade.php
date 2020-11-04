@extends('layouts.app')
@push('scripts')

<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js" defer></script>
<script src="{{asset('js/ddm.js')}} "></script>
<script src="{{asset('js/selector.js')}}" defer></script>

<script src="https://cdn.rawgit.com/dbunic/REDIPS_drag/master/redips-drag-min.js" defer></script>

@endpush
@push('styles')
<link href="{{asset('css/rtc_scheduler.css')}}" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" rel="stylesheet" />
@endpush
@section('content')

<div class="container">
    <div class="card">
        <div class="card-body">

            <div id="redips-drag">
                <div class="col-md-11 ">
                    <p id="starting_station_id"></p>
                    <p id="order_id"></p>
                    <label for="orders">Rendelás kiválasztása</label>
                    <select onchange="Selector()" id="orders" name="orders[]" multiple="multiple">
                        @foreach($orders as $order)
                        <option value="{{$order->id}}">{{$order->id}}</option>
                        @endforeach
                    </select>
                </div>
                <table id="table1">
                    <tbody>

                        <tr id="timeline">
                            <th id="cim" class="redips-mark">Timeline</th>
                        </tr>

                        @foreach($stations as $station)
                        <tr id="station_{{$station->id}}">
                            <th id="cim" class="redips-mark">{{$station->name}}</th>
                        </tr>
                        @endforeach

                        @foreach($types as $type)
                        <tr id="type_{{$type->id}}">
                            <th id=cim class="redips-mark">{{$type->name}}</th>
                        </tr>
                        @endforeach
                        @foreach($types as $type)
                        <tr id="capacity_{{$type->id}}">
                            <th id=cim class="redips-mark">Capacity:{{$type->name}}</th>
                        </tr>
                        @endforeach

                    </tbody>

                </table>
                <div><input type="button" value="Mentés" class="button" onclick="processShipment()"  /><span ></span></div>

            </div>
        </div>


    </div>
</div>
@endsection