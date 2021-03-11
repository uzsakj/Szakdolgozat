import {get_wagon_per_type} from './fill_table.js';
window.process_shipment = function () {
    //parse date
    console.log(get_table_content());

};
function get_table_content(){
    var table_data = window.REDIPS.drag.saveContent('table1', 'plain').split('&');
    return table_data;
}
