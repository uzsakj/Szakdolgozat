window.Selector = function () {


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


    $("select option:selected").each(function () {

        $.post("/scheduler/order/" + this.value, { '_token': $('meta[name=csrf-token]').attr('content') }).done(function (data) {
            var station = data['destination_station_id'];
            var starting_station_id= data['starting_station_id'];
            var ordered_types = data['ordered_products'];
            ordered_types = ordered_types.split(',');
            var ordered_quantities = data['ordered_quantities'];
            ordered_quantities = ordered_quantities.split(',');
            var deadline = data['deadline'];


            $("#starting_station_id").text("induló állomás:" + data['starting_station_id']);
            $("#order_id").text("Jelenleg betöltött rendeles:" + data['id']);
            var diffDays = datediff(parseDate(getToday()), parseDate(deadline));


            //deleting cells from previous orders
            $("#table1").find('td').each(
                function () {
                    if ($(this).attr('id') != "cim") {
                        $(this).remove();
                    }

                }
            )
            //hide all rows
            $("#table1").find('tr').each(
                function () {
                    $(this).hide();
                }
            )

            //showing only the necessery row
            $("#table1").find('tr').each(
                function () {
                    if (($(this).attr('id') == ("station_" + station)) || ($(this).attr('id') == "timeline")) {
                        $(this).show();
                    }
                    for (var i = 0; i < ordered_types.length; i++) {
                        if (($(this).attr('id') == ("type_" + ordered_types[i]))) {
                            $(this).show();
                        }
                        if (($(this).attr('id') == ("capacity_" + ordered_types[i]))) {
                            $(this).show();
                        }
                    }
                }
            )
            var types=[];
            for (var j = 0; j < ordered_types.length; j++) { types[j]="type"+ordered_types[j];}

            console.log(types);
            //filling
            for (var i = 0; i <= diffDays; i++) {
                var nl = "<td id=timeline_column" + (i + 1) + " class='redips-mark'>" + dateincrement(getToday(), i) + "</td>";
                $("#timeline").append(nl);
               
                var nl = "<td id=station_column" + (i + 1) + " class='redips-mark " +types+"'></td>";
                $("#station_" + station).append(nl);

                for (var j = 0; j < ordered_types.length; j++) {
                    var nl = "<td id=type" + ordered_types[j] + "column" + (i + 1) + " class='redips-mark type"+ordered_types[j]+"'></td>";
                    $("#type_" + ordered_types[j]).append(nl);
                }
                for (var j = 0; j < ordered_types.length; j++) {
                    var nl = "<td id=capacity" + ordered_types[j] + "column" + (i + 1) + " class='redips-mark'></td>";
                    $("#capacity_" + ordered_types[j]).append(nl);
                }
            }

            
            //adding order cells
            for (var j = 0; j < ordered_types.length; j++) {

                $("#type" + ordered_types[j] + "column1").append("<div id=" + ordered_types[j] + "_" + ordered_quantities[j] + " class='redips-drag type"+ordered_types[j]+"'>" + ordered_quantities[j] + "</div>");
            }
            //adding capacity
            
            $.post("/scheduler/wagon/" + starting_station_id, { '_token': $('meta[name=csrf-token]').attr('content') }).done(function (data) {
                //console.log(Object.keys(data));
                let wagons=[];
                Object.keys(data).forEach(function (item) {
                    var temp = (data[item]["type_id"]);
                    wagons.push(temp);
                })
                console.log(wagons);
                for(let i=0;i<wagons.length;i++)
                {
                    if(wagons[i]==1)
                    {
                        $("#capacity_1 td").each(function(){
                            $(this).append("<div style='background-color:blue;padding:3px;border:1px solid white'></div>");
                        })
                    }
                    if(wagons[i]==2)
                    {
                        $("#capacity_2 td").each(function(){
                            $(this).append("<div style='background-color:red;padding:3px;border:1px solid white'></div>");
                        })
                    }
                    if(wagons[i]==3)
                    {
                        $("#capacity_3 td").each(function(){
                            $(this).append("<div style='background-color:green;padding:3px;border:1px solid white'></div>");
                        })
                    }
                    if(wagons[i]==4)
                    {
                        $("#capacity_4 td").each(function(){
                            $(this).append("<div style='background-color:purple;padding:3px;border:1px solid white'></div>");
                        })
                    }
                }
            });

            window.REDIPS.drag.init();
            window.REDIPS.drag.event.dropped = function () {
                refreshOpening();
             };


        });




    });


};
window.processShipment = function () {
    //parse date
    function parseDate(date) {
        var ymd = String(date).split('-');
        var dd = String(ymd[2]).padStart(2, '0');
        var mm = String(ymd[1] - 1).padStart(2, '0');
        var yyyy = ymd[0];
        return new Date(yyyy, mm, dd);
    }

    //calculate diff in days
    function datediff(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

    function shipment(wagons_needed,order_id,starting_station_id,destination_station_id,current_shippping_date,deadline){
        var time_span = datediff(parseDate(current_shippping_date), parseDate(deadline));
        $.post("/scheduler/create_train/" + wagons_needed, { '_token': $('meta[name=csrf-token]').attr('content') }).done(function (data) {
            var train_id;
            train_id = parseInt(data);
            for (var i = 0; i < wagons_needed.length; i++) {
                $.post("/scheduler/wagon_paired/" + train_id, { '_token': $('meta[name=csrf-token]').attr('content'), 'wagon_id': wagons_needed[i] }).done(function (data) {

                });
            }                     
            $.post("/scheduler/get_route/", {
                '_token': $('meta[name=csrf-token]').attr('content'),
                'first_station_id': starting_station_id,
                'last_station_id': destination_station_id,
            }).done(function (data) {
                var route_id = data;
                $.post("/scheduler/create_shipment/", {
                    '_token': $('meta[name=csrf-token]').attr('content'),
                    'order_id': order_id,
                    'train_id': train_id,
                    'route_id': route_id,
                    'time_span': time_span,
                    'departure': current_shippping_date,
                    'status': "1",
                }).done(function (data) {
                    console.log(data);
                });
            });

        });
    } 

    var starting_station_id = $("#starting_station_id").text().split(':')[1];
    //console.log(starting_station_id);
    var wagons = [];
    $.post("/scheduler/wagon/" + starting_station_id, { '_token': $('meta[name=csrf-token]').attr('content') }).done(function (data) {
        //console.log(Object.keys(data));
        Object.keys(data).forEach(function (item) {
            //console.log(data[item]['type_id']);
            if (data[item]['station_id'] != null) {
                var temp = (data[item]['id'] + "_" + data[item]["type_id"] + "_" + data[item]['capacity']);
                wagons.push(temp);
            }

        })


        //console.log(wagons);

        var table_data = window.REDIPS.drag.saveContent('table1', 'plain').split('&');
        for (var i = 0; i < table_data.length; i++) {
            table_data[i] = table_data[i].split('=')[1];
        }
        //console.log(table_data);
        var rows = [];
        $("tr").each(
            function () {
                rows.push($(this).attr("id"));//.split("_")[0]);
            });
        var dates = [];
        var deadline = $("#timeline td").last().text();
        $("#timeline td").each(
            function () {
                dates.push($(this).text());
            });
        //console.log(dates);
        var shippin_dates = [];
        var destination_station_id;
        var orders_paired_to_station_flag = 0;
        for (var i = 0; i < table_data.length; i++) {
            if (!(shippin_dates.includes(dates[table_data[i].split('_')[3] - 1]))) {
                shippin_dates.push(dates[table_data[i].split('_')[3] - 1]);
            }

            if (rows[table_data[i].split('_')[2]].split('_')[0] != "station") {

                orders_paired_to_station_flag = 1;
            }
            else {
                destination_station_id = rows[table_data[i].split('_')[2]].split('_')[1];
            }


        }
        console.log(shippin_dates);
        if (orders_paired_to_station_flag == 0) {
            for (var x = 0; x < shippin_dates.length; x++) {
                  
                var ordered_types = [];
                var ordered_quantities = [];
                for (var i = 0; i < table_data.length; i++) {
                    if (shippin_dates[table_data[i].split('_')[3] - 1] == shippin_dates[x]) {
                        ordered_types.push(table_data[i].split('_')[0]);
                        ordered_quantities.push(table_data[i].split('_')[1]);
                    }
                }
                console.log(ordered_types);
                console.log(ordered_quantities);

                var station_capacity_per_type = [];
                //sum wagon capacity using type id as the index
                for (var i = 0; i < wagons.length; i++) {
                    var temp = wagons[i].split('_');
                    var index = parseInt(temp[1]);
                    var value = parseInt(temp[2]);

                    if (station_capacity_per_type[index] != null) {
                        station_capacity_per_type[index] += value;
                    }
                    else {
                        station_capacity_per_type[index] = 0;
                        station_capacity_per_type[index] += value;
                    }

                }
                //console.log(station_capacity_per_type);
                var capacity_flag = 0;
                var wagons_needed = [];
                for (var i = 0; i < ordered_types.length; i++) {
                    if (station_capacity_per_type[ordered_types[i]] < ordered_quantities[i]) {
                        capacity_flag = 1;
                    }
                    else {
                        var quantity_needed = ordered_quantities[i];
                        for (var j = 0; j < wagons.length; j++) {

                            if (ordered_types[i] == wagons[j].split('_')[1] && quantity_needed > 0) {
                                wagons_needed.push(wagons[j].split('_')[0]);
                                quantity_needed = quantity_needed - wagons[j].split('_')[2];
                            }

                        }
                    }


                }
                console.log(wagons_needed);
                if (wagons_needed.length != 0) {
                    
                    var order_id = $("#order_id").text().split(':')[1];
                    var starting_station_id = $("#starting_station_id").text().split(':')[1];
                    var current_shippping_date = shippin_dates[x];
                    
                    shipment(wagons_needed,order_id,starting_station_id,destination_station_id,current_shippping_date,deadline);

                    


                }
                else {

                    console.log("not enough capacity")
                }
            }
        }
        else {
            console.log("has to fill all orders");
        }


    });


    //console.log(temp1);
};
window.refreshOpening=function(){
        // get target and source position (method returns positions as array)
        // pos[0] - target table index
        // pos[1] - target row index
        // pos[2] - target cell (column) index
        // pos[3] - source table index
        // pos[4] - source row index
        // pos[5] - source cell (column) index
        var change = window.REDIPS.drag.getPosition();
        let current_row_pos=change[1];
        let current_cell_pos=change[2];
        let source_row_pos=change[4];
        let source_cell_pos=change[5];
        //let columns_to_refresh=change[]
        let row_ids=[];
        $("#table1 tr").each(function(){
            row_ids.push($(this).attr('id'));
        })
        let cells= $("#"+row_ids[current_row_pos]+" td");
        let source_cells=$("#"+row_ids[source_row_pos]+" td");
        let source_cell=source_cells[source_cell_pos-1];
        let actual_cell =cells[current_cell_pos-1];
        //console.log(actual_cell);
        let actual_cell_id=actual_cell.id;
        //console.log(source_cell);
        let source_cell_id=source_cell.id;
        if(actual_cell_id.split('_')[0] == "station")
        {
        let actual_type=$("#"+actual_cell_id+" div").attr('id').split('_')[0];
        
        let capacity_rows= [];
        $("#capacity_"+actual_type+" td").each(function(){
            capacity_rows.push($(this));
        })
        let subtract =capacity_rows[current_cell_pos-1];
        //subtract.first();
        subtract = subtract.attr('id');
        //console.log(subtract);
        $("#"+subtract).find('div').first().each(function(){
           
            $(this).remove();
        })
        console.log(source_cell_id);
        if(source_cell_id.split('_')[0] == "station")
        {
            
            let adding =capacity_rows[source_cell_pos-1];

            if(actual_type==1)
            {
                adding.append("<div style='background-color:blue;padding:3px;border:1px solid white'></div>");
            }
            if(actual_type==2)
            {
                adding.append("<div style='background-color:red;padding:3px;border:1px solid white'></div>");
            }
        }
        
        }
        
        //console.log(row_ids);
       // console.log(current_row_pos);
       // console.log(current_cell_pos);
       //console.log(actual);
        //console.log(cells);
   
}
window.onload = function () {
    rd = window.REDIPS.drag;	// reference to REDIPS.drag lib
rd.init();
// define  class name as exception for cells
rd.mark.exceptionClass.type1 = 'type1';
rd.mark.exceptionClass.type2 = 'type2';
rd.mark.exceptionClass.type3 = 'type3';
rd.mark.exceptionClass.type4 = 'type4';
console.log("proba");       
// event handler called after DIV element is dropped to TD
rd.event.dropped = function (targetCell) {
    console.log("proba");
    let divClass = rd.mark.exceptionClass; // DIV exception class
        
    // if the DIV element was dropped to allowed cell
    if (targetCell.className.indexOf(divClass.type1) > -1 ||
        targetCell.className.indexOf(divClass.type2) > -1 ||
        targetCell.className.indexOf(divClass.type3) > -1 ||
        targetCell.className.indexOf(divClass.type4) > -1 
        ) {
            
        // make DIV unmovable
        rd.enableDrag(false, rd.obj);
        
        
            console.log("proba");
        
    }
};
};

// add onload event listener
if (window.addEventListener) {
window.addEventListener('load', window.REDIPS, false);
}
else if (window.attachEvent) {
window.attachEvent('onload', window.REDIPS.drag.init());
}
//window.REDIPS.init();
////


