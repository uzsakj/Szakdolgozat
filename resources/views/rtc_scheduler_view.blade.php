@extends('layouts.app')
@push('scripts')
<script src="https://cdn.rawgit.com/dbunic/REDIPS_drag/master/redips-drag-min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js" defer></script>
<script src="{{asset('js/ddm.js')}} "></script>
<script src="{{asset('js/selector.js')}}" defer></script>
<script src="{{asset('js/rtc_scheduler.js')}} " defer></script>
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
                <p id="demo"></p>
                    <label for="orders">Rendelás kiválasztása</label>
                    <select onchange="Selector()" id="orders" class="form-control js-states js-example-basic-multiple" name="orders[]" multiple="multiple">
                        @foreach($orders as $order)
                        <option value="{{$order->id}}">{{$order->id}}</option>
                        @endforeach
                    </select>
                </div>
                <table >
                    <colgroup>
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                    </colgroup>
                    <tbody>
                        <tr id="t1">
                        <td class="redips-mark">Timeline</td>
                        </tr>
                        @foreach($stations as $station)
                        <tr id="station{{$station->id}}">
                            <td class="redips-mark">{{$station->name}}</td>
                        </tr>
                        @endforeach
                        @foreach($types as $type)
                        <tr id="type{{$type->id}}">
                            <td class="redips-mark">{{$type->name}}</td>
                        </tr>
                        @endforeach
                    </tbody>

                </table>

            </div>
        </div>

        <div><input type="button" value="Save1" class="button" onclick="redips.save('plain')" title="Send content to the server (it will only show accepted parameters)" /><span class="message_line">Save content of the first table (plain query string)</span></div>
        <div><input type="button" value="Save2" class="button" onclick="redips.save('json')" title="Send content to the server (it will only show accepted parameters)" /><span class="message_line">Save content of the first table (JSON format)</span></div>
        <div><input type="radio" name="drop_option" class="checkbox" onclick="redips.setMode(this)" value="multiple" title="Enabled dropping to already taken table cells" checked="true" /><span class="message_line">Enable dropping to already taken table cells</span></div>
        <div><input type="radio" name="drop_option" class="checkbox" onclick="redips.setMode(this)" value="single" title="Disabled dropping to already taken table cells" /><span class="message_line">Disable dropping to already taken table cells</span></div>
        <div><input type="radio" name="drop_option" class="checkbox" onclick="redips.setMode(this)" value="switch" title="Switch content" /><span class="message_line">Switch content</span></div>
        <div><input type="radio" name="drop_option" class="checkbox" onclick="redips.setMode(this)" value="switching" title="Switching content continuously" /><span class="message_line">Switching content continuously</span></div>
        <div><input type="radio" name="drop_option" class="checkbox" onclick="redips.setMode(this)" value="overwrite" title="Overwrite content" /><span class="message_line">Overwrite content</span></div>
        <div><input type="checkbox" class="checkbox" onclick="redips.toggleDeleteCloned(this)" title="Remove cloned object if dragged outside of any table" checked="true" /><span class="message_line">Remove cloned element if dragged outside of any table</span></div>
        <div><input type="checkbox" class="checkbox" onclick="redips.toggleConfirm(this)" title="Confirm delete" /><span class="message_line">Confirm delete</span></div>
        <div><input type="checkbox" class="checkbox" onclick="redips.toggleDragging(this)" title="Enable dragging" checked="true" /><span class="message_line">Enable dragging</span></div>

    </div>
</div>
@endsection