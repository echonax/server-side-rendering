$(document).ready(function () {

    var userData = {};

    var socket = io.connect();

    socket.on('connect', function (data) {
        console.log(data);
        //socket.emit('my other event', { my: 'data' });
    });

    //fields
    var _outlets = $('.outlets');
    var _soketSettingsSave = $('#soketSettingsSave');
    var _nameSettingsSave = $('#nameSettingsSave');
    //name text fields
    var _nameInput = $('#nameInput');
    var _socketNameInput = $('#socketNameInput');
    //checkbox
    var states = '';
    //postpone text fields
    var _socketPostponeInput = $('#postponeInput');
    //time
    var _firstTimeTitle = $('#collapseOneTitle');
    var _firstStartTimeTitle = $('#startTimeTitle');
    var _firstEndTimeTitle = $('#endTimeTitle');
    var _firstStartTime = $('#firstStartTime');
    var _firstEndTime = $('#firstEndTime');

    //weekday
    var checkboxes = $(':checkbox'),
        span = $('#allChecked');

    var _modalTitle = $('#myModalLabel');
    var _postponeSelector = $('#postponeSelector');
    
    //AJAX DATA

    var _isOn = false;
    var _currentSocket = 999;    
    

    socket.on('socketData', function (data) {
        console.log(data);
        //socket.emit('my other event', { my: 'data' });
        //get;rpi_id;0;can;true;10;10;10;123;
        userData = data.split(' ');
        console.log(userData);
        //slice states
        states = userData[4].replace('{','').replace('}','').split(',');
        console.log(states); 
        //for each socket circle fill the color
          $.each(_outlets, function (i, v) {
                if(states[i] === "J_ON" || states[i] === "F_ON")
                    $(v).attr('fill','green');
                else if(states[i] === "J_OFF")
                    $(v).attr('fill','red');
                else if( states[i] === "F_OFF")
                    $(v).attr('fill','gray');
          });
           
        //name fields
        // $('#outlet1').siblings('text').text(userData[3]);
        // _socketNameInput.text(userData[3]);
        // _nameInput.val(userData[3]);

        //checkbox
        

        // if(userData[4] === "true")
        //     $('#outlet1').attr('fill','green');
        // else if(userData[4]==="false")
        //     $('#outlet1').attr('fill','red');
        // else
        //     $('#outlet1').attr('fill','gray');

        //postpone
        //_socketPostponeInput.text(userData[5]);
        //time
        // _firstTimeTitle.text(userData[6] + "-" + userData[7]);
        // _firstStartTimeTitle.text(userData[6]);
        // _firstEndTimeTitle.text(userData[7]);
        // _firstStartTime.val(userData[6]);
        // _firstEndTime.val(userData[7]);
        //weektime
        //$.each(checkboxes,function(i, v){});

    });
     
        
    //isOn state
    //$('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
    //    console.log(state); // true | false
    //    _isOn = state;
    //  });
    
    
    //init
    _outlets.on('click', function (e) {
        var soketNo = e.target.id;
        _modalTitle.text(soketNo + " no'lu priz için ayarlar");
        console.log(states[soketNo]);
        switch(states[soketNo]){
            case 'F_ON':
                $("[name='my-checkbox']").bootstrapSwitch('state', true);  
                break;
            case 'J_ON':
                $("[name='my-checkbox']").bootstrapSwitch('state', true);  
                break;
            default:
                $("[name='my-checkbox']").bootstrapSwitch('state',false);  
        }
       
        $('#socketSettings').modal('show');        
    });


  

    //
    //$('#socketSettings').on('shown', function (event) {
    //    console.log('here', event);
    //
    //    var modal = $(this);
    //   // modal.find('.modal-title').text(_currentSocket + " no'lu priz için ayarlar" );
    //    _startTime.val('11:31');
    //    _endTime.val('11:32');
    //});
    


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

    var input = $('#single-input').clockpicker({
    placement: 'bottom',
    align: 'left',
    autoclose: true,
    'default': 'now'
});

    // Manually toggle to the minutes view
    $('#check-minutes').click(function(e){
        // Have to stop propagation here
        e.stopPropagation();
        input.clockpicker('show')
                .clockpicker('toggleView', 'minutes');
    });
                

                
                
    

    //checkboxes.prop('checked', true);

    checkboxes.on('change', function () {
        var checked = checkboxes.filter(':checked');
        if (checked.length == checkboxes.length)
            span.text('(All Days Selected)');
        else {
            var days = jQuery.map(checked, function (n, i) { return n.id; });
            span.text('(' + days.join(', ') + ' Selected)');
        }
    });
    
    
    
    
    
    
    //SAVES
    _nameSettingsSave.on('click', function(e){

        userData[3] = _nameInput.val();       
        _socketNameInput.text(userData[3]); 
        $('#outlet1').siblings('text').text(userData[3]);
        userDataToSend = userData.join(';');

        $.ajax({
                  method: 'POST',
                  url: '/socketNameSave',
                  data: {'0':userDataToSend},
                  cache: false,
                  timeout: 5000,
                }).done(function() {console.log( "success" );});

         
    });
    
    
    _soketSettingsSave.on('click', function(e){
        console.log('here');
        var obj = {
                        "name":_socketNameInput.val(),
                        "isOn":_isOn,
                        "postpone":9,
                        "time":[{
                            "start":'2',
                            "end":'3'
                        }]
                    };    

    });

});



