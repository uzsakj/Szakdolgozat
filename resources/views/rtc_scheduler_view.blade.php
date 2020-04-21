@extends('layouts.app')
@push('scripts')
<script src="{{asset('js/rtc_scheduler.js')}} "></script>
<script src="https://cdn.rawgit.com/dbunic/REDIPS_drag/master/redips-drag-min.js" defer></script>
@endpush
@push('styles')
<link href="{{asset('css/rtc_scheduler.css')}}" rel="stylesheet">
@endpush
@section('content')
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<div id="redips-drag">
    <table id="table1">
        <colgroup>
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
        </colgroup>
        <tr>
            <td class="redips-mark">You</td>
            <td class="redips-mark">can</td>
            <td class="redips-mark">not</td>
            <td class="redips-mark">drop</td>
            <td class="redips-mark">here</td>
        </tr>
        <tr class="lgrey">
            <td>
                <div id="d1" class="redips-drag t1">Drag</div>
            </td>
            <td></td>
            <td>
                <div id="d2" class="redips-drag t1">and</div>
            </td>
            <td>
                <div id="d3" class="redips-drag t1">drop</div>
            </td>
            <td></td>
        </tr>
        <tr>
            <td>
                <div id="d4" class="redips-drag t1">table</div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <div id="d5" class="redips-drag t1">content</div>
            </td>
        </tr>
        <tr class="lgrey">
            <td></td>
            <td>
                <div id="d6" class="redips-drag t1">with</div>
            </td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>
                <div id="d7" class="redips-drag t1">JavaScript</div>
            </td>
            <td></td>
            <td></td>
        </tr>
        <tr class="lgrey">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <div id="d8" class="redips-drag t1"><img alt="Smile" id="smile_img" src="icon_smile.gif" /></div>
            </td>
            <!-- <td><div id="d8" class="redips-drag t1"><img id="smile_img" src="/wp-includes/images/smilies/icon_smile.gif"/></div></td> -->
        </tr>
    </table>
    <table id="table2">
        <colgroup>
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
        </colgroup>
        <tr>
            <td class="redips-mark" title="You can not drop here">Table2</td>
            <td class="lgrey">
                <div id="d9" class="redips-drag t2">and</div>
            </td>
            <td rowspan="3" style="background-color: #C6C8CB" title="rowspan 3"></td>
            <td class="lgrey"></td>
            <td></td>
        </tr>
        <tr>
            <td>
                <div id="d10" class="redips-drag t2">Drag</div>
            </td>
            <td class="lgrey"></td>
            <td class="lgrey">
                <div id="d11" class="redips-drag t2">drop</div>
            </td>
            <td>
                <div id="d12" class="redips-drag t2"><select style="width: 60px">
                        <option>table</option>
                        <option>drop</option>
                        <option>down</option>
                        <option>menu</option>
                    </select></div>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="background-color: #C6C8CB" title="colspan 2"></td>
            <td colspan="2" style="background-color: #C6C8CB" title="colspan 2"></td>
        </tr>
        <tr>
            <td colspan="2" style="background-color: #C6C8CB" title="colspan 2"></td>
            <td rowspan="3" style="background-color: #C6C8CB" title="rowspan 3"></td>
            <td colspan="2" style="background-color: #C6C8CB" title="colspan 2"></td>
        </tr>
        <tr>
            <td>
                <div id="d13" class="redips-drag t2"><input type="text" style="width: 60px" value="content" /></div>
            </td>
            <td class="lgrey"></td>
            <td class="lgrey"></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td class="lgrey">
                <div id="d14" class="redips-drag t2">with</div>
            </td>
            <td class="lgrey">
                <div id="d15" class="redips-drag t2">JavaScript</div>
            </td>
            <td class="redips-mark smile" title="Only smile can be placed here"></td>
        </tr>
    </table>
    <table id="table3">
        <colgroup>
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
        </colgroup>
        <tr class="lgrey">
            <td id="message" class="redips-mark" title="You can not drop here">Table3</td>
            <!-- jump to smile image -->
            <td>
                <div id="link1" class="redips-drag t3"><a href="#smile_img" title="Jump to the smile image (links can be used as well)">Smile</a></div>
            </td>
            <td></td>
            <td></td>
            <td>
                <div id="d16" class="redips-drag t3"><input type="checkbox" name="cb1" /><input type="checkbox" name="cb2" /><input type="checkbox" name="cb3" /></div>
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>
                <div id="d17" class="redips-drag t3 redips-clone" title="infinite cloning">Clone</div>
            </td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>
                <div id="d18" class="redips-drag t3 redips-clone climit1_3" title="Clone three elements">(1) Clone</div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <div id="d19" class="redips-drag t3 redips-clone climit2_2" title="Clone two elements and die">(2) Clone</div>
            </td>
        </tr>
        <tr class="lgrey">
            <td>
                <div id="d20" class="redips-drag t3"><input type="radio" name="radio1" /><input type="radio" name="radio1" /><input type="radio" name="radio1" /></div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td class="redips-trash" title="Trash">Trash</td>
        </tr>
    </table>
    <div class="container">
        <div>
            <table id="table1" style="width:100%">
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
                    <tr>
                        <th class="redips-mark">type1</th>
                        <td>
                            <div id="d5" class="redips-drag t1">content</div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th class="redips-mark">type1</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th class="redips-mark">type1</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th class="redips-mark">type1</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th class="redips-mark">type1</th>
                        <td>a</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
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

@endsection