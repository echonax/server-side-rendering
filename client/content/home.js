$(document).ready(function () {

    var _startTime = $('#startDate');
    var _endTime = $('#endDate');
    var _outlets = $('.outlets');

    var _modalTitle = $('#myModalLabel');

    _outlets.on('click', function (e) {
        _modalTitle.innerHTML = 'soket' + $.data(e.target, 'soket');
        console.log($.data(e.target, 'soket'));
        // $( this ).css( "stroke", "red" );
    });


    $.each(_outlets, function (i, v) {
        $.data(v, 'soket', i);

    });


    $('#myModal').on('show.bs.modal', function (event) {

        var currentButton = event.relatedTarget; // Button that triggered the modal
        var recipient = $.data(currentButton, 'soket');

        var modal = $(this);
        modal.find('.modal-title').text('New message to soket no = ' + recipient);
        _startTime.val('11:31');
        _endTime.val('11:32');
        //modal.find('.modal-body input').val(recipient)
    });


    $('.clockpicker').clockpicker({
        donetext: 'Done',
        init: function () {
            console.log("colorpicker initiated");
        },
        beforeShow: function () {
            console.log("before show");
        },
        afterShow: function () {
            console.log("after show");
        },
        beforeHide: function () {
            console.log("before hide");
        },
        afterHide: function () {
            console.log("after hide");
        },
        beforeHourSelect: function () {
            console.log("before hour selected");
        },
        afterHourSelect: function () {
            console.log("after hour selected");
        },
        beforeDone: function () {
            console.log("before done");
        },
        afterDone: function () {
            console.log("after done");
        }
    });
                
                
                
    //****weekday
    var checkboxes = $(':checkbox'),
        span = $('#allChecked');

    checkboxes.prop('checked', true);

    checkboxes.on('change', function () {
        var checked = checkboxes.filter(':checked');
        if (checked.length == checkboxes.length)
            span.text('(All Days Selected)');
        else {
            var days = jQuery.map(checked, function (n, i) { return n.id; });
            span.text('(' + days.join(', ') + ' Selected)');
        }
    });
       
       
       
    //
});




    // $.ajax({url: '/user', cache: false, timeout: 5000, dataType: "json",success: function(data, textStatus, jqXHR) {
    // console.log(data);
    // $("#hpvalue").append(data.HP);
    // $("#energyvalue").append(data.ENERGY);
    // }});
    // 