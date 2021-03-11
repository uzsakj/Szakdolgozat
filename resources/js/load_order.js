import {fill_table} from './fill_table.js';


var okButton = document.getElementById('ok');
okButton.addEventListener('click', load, false);

function load() {
    let order_id = document.getElementById('orders').value;
    $.post("/scheduler/order/" + order_id, { '_token': $('meta[name=csrf-token]').attr('content') }).done(function (data) {
        let destination_station_id = data['destination_station_id'];
        let starting_station_id = data['starting_station_id'];
        let ordered_types = data['ordered_products'];
        ordered_types = ordered_types.split(',');
        let ordered_quantities = data['ordered_quantities'];
        ordered_quantities = ordered_quantities.split(',');
        let deadline = data['deadline'];
        fill_table(deadline,ordered_types,destination_station_id,starting_station_id,ordered_quantities);
    
    });
}