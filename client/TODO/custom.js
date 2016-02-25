$(document).ready(function() {
//DataTable
    var t = $('#example').DataTable();
    var counter = 1;
    //Add datatable data
    $('#addRow').on( 'click', function () {
        t.row.add( [
            counter +'.1',
            counter +'.2',
            counter +'.3',
            counter +'.4',
            counter +'.5'
        ] ).draw();
 
        counter++;
    } );
 
    // Automatically add a first row of data
    $('#addRow').click();

/*        ******************Event page*******************************************
/*    $("#event").click(function(){
        $("#content").load("event.html");
    });*/



//Add event divs!
    $('#eventAddButton').click(function () {
        var eName = $('input[name=eventName]').val();
        var eDate = $('input[name=eventDate]').val();
        var ePrice = $('input[name=eventPrice]').val();

        //$('.list').append('<div class="data-table-small">  Event Name :' + eName +'<br /> Event Date :' + eDate+'<br /> Event Price :' + ePrice + '</div>');
        //Let the boxes fade in stylishly
        $('<div class="data-table-small"><div class="row"><div class="col-md-6"><span class="floatR">Event Name :</span><br/><span class="floatR">Event Date :</span><br/><span class="floatR">Event Price :</span></div><div class="col-md-6">'+eName+'<br/>'+eDate+'<br/>'+ePrice+'</div></div></div>').hide().appendTo('.list').fadeIn(1000);
        });
            
} );


/*'<div class="data-table-small"><div class="row"><div class="col-md-6"><span class="floatR">Event Name :</span><br/><span class="floatR">Event Date :</span><br/><span class="floatR">Event Price :</span></div><div class="col-md-6">'+eName+'<br/>'+eDate+'<br/>'+ePrice+'</div></div></div>'*/