import { reject } from "lodash";
import { refreshOpening } from "./drag.js";
//parse date
function parseDate(date) {
    var ymd = String(date).split('-');
    var dd = String(ymd[2]).padStart(2, '0');
    var mm = String(ymd[1]).padStart(2, '0');
    var yyyy = ymd[0];
    return new Date(yyyy, mm, dd);
}

//calculate diff in days
function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}
//constucting todays date
function getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

//increment date
function dateincrement(inputdate, daystoadd) {

    var indate = new Date(inputdate);
    indate.setDate(indate.getDate() + daystoadd);
    var date = formatDate(indate);

    return date;
}

async function fill_table(deadline, ordered_types, destination_station_id, starting_station_id,ordered_quantities) {
    //calculating days till deadline
    let diffDays = datediff(parseDate(getToday()), parseDate(deadline));

    //filling types array
    let types = [];
    for (var j = 0; j < ordered_types.length; j++) {
        types[j] = "type" + ordered_types[j];
    }

    //deleting cells from table to avoid overfilling and reset table
    $("#table1").find('tr').each(
        function () {
            if ($(this).attr('id') != "timeline") {
                $(this).remove();
            }

        }
    )
    $("#table2").find('td').each(
        function () {
            $(this).remove();
        }
    )
    $("#table3").find('tr').each(
        function () {
            $(this).remove();
        }
    )

    //adding rows

    let destination_station_name = await get_station_name(destination_station_id);
    let nr = '<tr id="station_' + destination_station_id + '"><th id="cim" class="redips-mark">' + destination_station_name + '</th></tr>';
    $("#table1").append(nr);

    for (var i = 0; i < types.length; i++) {
        let nr = '<tr id="capacity_' + types[i] + '"><th id="cim" class="redips-mark"> Kapacitás:' + types[i] + '</th></tr>';
        $("#table1").append(nr);
    }


    let cim = '<tr id="cim"><th id="cim" class="redips-mark">Rendelt típus</th><th id="cim" class="redips-mark"> Rendelt mennyiség </th></tr>';
        $("#table3").append(cim);
    for (var i = 0; i < types.length; i++) {
        let nr = '<tr id="ordered_' + types[i] + '"><th id="cim" class="redips-mark">' + types[i] + '</th></tr>';
        $("#table3").append(nr);
    }







    //filling ip table
    for (var i = 0; i <= diffDays; i++) {
        var nl = "<td id=timeline_column_" + (i) + " class='redips-mark'>" + dateincrement(getToday(), i) + "</td>";
        $("#timeline").append(nl);

        var nl = '<td id="station_column_' + (i) + '" class="' + types + '"></td>"';
        $("#station_" + destination_station_id).append(nl);

        for (var j = 0; j < types.length; j++) {
            var nl = "<td id=capacity_" + types[j] + "column_" + (i) + " class='redips-mark'></td>";
            $("#capacity_" + types[j]).append(nl);
        }
    }

    //filling type table
    $("#types").append('<td id="cim" class="redips-mark">wagons</td>');
    for (var i = 0; i < types.length; i++) {
        $("#types").append('<td id="type_' + ordered_types[i] + '" class="redips-mark"><div id="' + types[i] + '" class="redips-drag redips-clone ' + types[i] + '">' + types[i] + '</div>')
    }
    //adding thrash can
    $("#types").append('<td class="redips-trash" title="Trash">Trash</td>');

    //filling ordered table
    for (var i = 0; i < types.length; i++) {
        $('#ordered_'+types[i]).append('<td id="type_' + ordered_types[i] + '" class="redips-mark">'+ordered_quantities[i]+'</td>')
    }

    // init redips 
    window.REDIPS.drag.init();
    window.REDIPS.drag.event.dropped = function () {
        refreshOpening(false);
    };
    window.REDIPS.drag.event.deleted = function () {
        refreshOpening(true);
    };
    //fill capacity
    for (var i = 0; i < ordered_types.length; i++) {
        let wagon_quantity = await get_wagon_per_type(starting_station_id, ordered_types[i]);

        add_to_capacity(ordered_types[i], wagon_quantity, true, null);

    }


}

function add_to_capacity(type_id, count, all, index) {
    var color = "";
    switch (type_id) {
        case "1": color = "blue"; break;
        case "2": color = "red"; break;
        case "3": color = "purple"; break;
        case "4": color = "green"; break;

    }
    if (all) {
        for (var i = 0; i < count; i++) {
            $('#capacity_type' + type_id + ' td').each(function () {
                $(this).append('<div style="background-color:' + color + ';padding:3px;border:1px solid white"></div>');
            })
        }
    }
    else {
        let columns = []
        $('#capacity_type' + type_id + ' td').each(function () {
            columns.push($(this));
        })
        for (var i = 0; i < count; i++) {
            columns[index].append('<div style="background-color:' + color + ';padding:3px;border:1px solid white"></div>');
        }
    }


}

function sub_from_capacity(type_id, count, all, index) {
    if (all) {
        for (var i = 0; i < count; i++) {
            $('#capacity_type' + type_id + ' td').find('div').first().each(function () {

                $(this).remove();
            })
        }
    }
    else {
        let columns = []
        $('#capacity_type' + type_id + ' td').each(function () {
            columns.push($(this));
        })
        for (var i = 0; i < count; i++) {
            columns[index].find('div').first().each(function () {

                $(this).remove();
            })
        }
    }


}
function check_capacity_per_type_per_col(type_id, col_index) {
    let columns = []
    $('#capacity_type' + type_id + ' td').each(function () {
        columns.push($(this));
    })
    let count = 0;
    columns[col_index].find('div').each(
        function () {
            count++;
        });

    return count;

}
function get_station_name(id) {
    return new Promise((resolve, reject) => {
        $.post("/scheduler/get_station_name_by_id/" + id, { '_token': $('meta[name=csrf-token]').attr('content') }).done(function (data) {
            let destination_station_name = data;
            resolve(destination_station_name);
        });

    })
}

function get_wagon_per_type(station_id, type_id) {
    return new Promise((resolve, reject) => {
        $.post("/scheduler/get_wagon/" + station_id, { '_token': $('meta[name=csrf-token]').attr('content'), 'type_id': type_id }).done(function (data) {
            let wagon_quantity = data;
            resolve(wagon_quantity);
        });
    }
    )
}
export { fill_table, add_to_capacity, sub_from_capacity,check_capacity_per_type_per_col };