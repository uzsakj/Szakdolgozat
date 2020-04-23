window.Selector = function () {
    //parse date
    function parseDate(date) {
        var ymd = String(date).split('-');
        var dd = String(ymd[2]).padStart(2, '0');
        var mm = String(ymd[1]).padStart(2, '0');
        var yyyy = ymd[0];
        return new Date(yyyy, mm, dd);
    }
    function formatDate(date){


    }
    //calculate diff in days
    function datediff(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }
    //constucting todays date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    var str = "";

    //increment date
    function dateincrement(inputdate,daystoadd)
    {
        var date=new Date();
        var ymd = String(inputdate).split('-');
        var dd = String(parseInt(ymd[2])+daystoadd).padStart(2, '0');
        var mm = String(ymd[1]).padStart(2, '0');
        var yyyy = ymd[0];
        date=yyyy + '-' + mm + '-' + dd;
        return date;
    }
    
    $("select option:selected").each(function () {
        str += $(this).text() + " ";
       
        var timeLine="<td class='redips-mark'>Timeline</td>";
        $("#t1").append(timeLine);
        $.post("/scheduler/order/" + this.value, { '_token': $('meta[name=csrf-token]').attr('content') }).done(function (data) {
            console.log(data);
                var overlap=0;
                var deadline = new Date();
                deadline = data['deadline'];
                var diffDays = datediff(parseDate(today), parseDate(deadline));
                if(document.getElementById($("#t1").find('td').last().attr("id"))!=null)
                {
                var lastDate = document.getElementById($("#t1").find('td').last().attr("id")).innerText;
                console.log(datediff(parseDate(lastDate), parseDate(deadline)));
                overlap=datediff(parseDate(lastDate), parseDate(deadline));
                }
                //deleting eyisting columns before insert
                $("#t1").find('td').each(function () {
                    $(this).remove();
                });
                for (var i = 0; i <= diffDays; i++) {
                    //create column to be inserted
                    var nl = "<td id=column" + (i + 1) + " class='redips-mark'>" + dateincrement(today,i) + "</td>";
                    //insert column
                    $("#t1").append(nl);
                }
                console.log(document.getElementById($("#t1").find('td').last().attr("id")).innerText);
                
        });
    });
    document.getElementById("demo").innerHTML = str;
}
