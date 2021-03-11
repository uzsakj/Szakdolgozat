@extends('layouts.app')
@push('scripts')

<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js" defer></script>
<script src="https://cdn.rawgit.com/dbunic/REDIPS_drag/master/redips-drag-min.js" defer></script>
<script src="{{asset('js/drag.js')}} " defer></script>
<script src="{{asset('js/ddm.js')}} "></script>
<script src="{{asset('js/fill_table.js')}} " defer></script>
<script src="{{asset('js/load_order.js')}} " defer></script>
<script src="{{asset('js/process_shipment.js')}} " defer></script>
<script src="{{asset('js/selector.js')}}" defer></script>



@endpush
@push('styles')
<link href="{{asset('css/rtc_scheduler.css')}}" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" rel="stylesheet" />
@endpush
@section('content')

<div id = "main_container" class="container">
    <div class="card">
        <div class="card-body">

            <div id="redips-drag">
                <div class="col-md-11 ">
                    <label for="orders">Rendelás kiválasztása</label>
                    <select id="orders" class ="orders js-example-basic-single" name="orders[]" >
                        @foreach($orders as $order)
                        <option value="{{$order->id}}">{{$order->id}}</option>
                        @endforeach
                    </select>
                    <button id="ok">OK</button>
                </div>
                <div id="top">
					<table id="table3">
						<tbody>
                            <tr id="orders">
							
                            </tr>
                        
						</tbody>
					</table>
				</div>
                <div id="mid">
					<table id="table2">
						<tbody>
                            <tr id="types">
							
                            </tr>
                        
						</tbody>
					</table>
				</div>
                
                <div id="bottom">
                <table id="table1">
                <colgroup>
							<col width="50"/>
							<col width="100"/>
							<col width="100"/>
							<col width="100"/>
							<col width="100"/>
							<col width="100"/>
						</colgroup>
                    <tbody>

                        <tr id="timeline">
                            <th id="cim" class="redips-mark">Timeline</th>
                        </tr>
                    </tbody>

                </table>
                </div>
                <div><input type="button" value="Mentés" class="button" onclick="process_shipment()"  /><span ></span></div>

            </div>
        </div>


    </div>
</div>
@endsection