$(document).ready(function () {

    var userData = [];
    var cData = {};

    var socket = io.connect();

    socket.on('connect', function (data) {
        console.log(data);
        //socket.emit('my other event', { my: 'data' });
    });

    //fields
    var _outlets = $('.outlets');
    var _outletTitles = $('.outlet-title');
    //saves
    var _soketSettingsSave = $('#soketSettingsSave');
    var _nameSettingsSave = $('#nameSettingsSave');
    var _postponeSettingsSave = $('#postponeSettingsSave');
    //2nd modals
    var _socketNameButton = $('#socketNameButton');
    var _socketPostponeButton = $('#socketPostponeButton');
    //1st fields    
    var _socketNameInput = $('#socketNameInput');
    var _socketPostponeInput = $('#socketPostponeInput');
    //2nd fields
    var _nameInput = $('#nameInput');
    var _postponeInput = $('#postponeInput');
    //checkbox
    var states = '';    
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
    
    //AJAX DATA

    var _isOn = false;
    var currentSoketNo = 0;

    socket.on('socketData', function (data) {
        
        cData = data.cMessage;
        userData = data.vMessage.split(' ');
console.log(cData);
        //slice states
        states = userData[4].replace('{','').replace('}','').split(',');
console.log(states); 
        //init
          $.each(_outlets, function (i, v) {
              //for each socket circle fill the color
                if(states[i] === "J_ON")
                    $(v).attr('fill','green');
                else if(states[i] === "F_ON")
                    $(v).attr('fill','white');
                else if(states[i] === "J_OFF")
                    $(v).attr('fill','red');
                else if( states[i] === "F_OFF")
                    $(v).attr('fill','gray');
              //for each socket fill out its name
              var name = cData.data[i].name;
              if(name.length > 0)
                  $(_outletTitles)[i].innerHTML = name;
                    
                
             
          });

    });
     
    
    //Clicks
    _outlets.on('click', function (e) {
         currentSoketNo = e.target.id;
        _modalTitle.text(currentSoketNo + " no'lu priz için ayarlar");
console.log(states[currentSoketNo]);        
console.log(cData.data[currentSoketNo]);
        //Name of Socket
        _socketNameInput.text(cData.data[currentSoketNo].name);        
        //State of Socket
        switch(states[currentSoketNo]){
            case 'F_ON':
                $("[name='my-checkbox']").bootstrapSwitch('state', true);  
                break;
            case 'J_ON':
                $("[name='my-checkbox']").bootstrapSwitch('state', true);  
                break;
            default:
                $("[name='my-checkbox']").bootstrapSwitch('state',false);  
        }
        //Postpone Value of Socket
        _socketPostponeInput.text(cData.data[currentSoketNo].postpone);
       
        $('#socketSettings').modal('show');        
    });
    //name click
    _socketNameButton.on('click', function(e){
        console.log(cData.data[currentSoketNo]);
        _nameInput.val(cData.data[currentSoketNo].name);        
        $('#nameSettings').modal('show');
    });
    //postpone click
    _socketPostponeButton.on('click', function(e){
        _postponeInput.val(cData.data[currentSoketNo].postpone);
        $('#postponeSettings').modal('show');
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
        console.log(cData, currentSoketNo);
        cData.data[currentSoketNo].name = _nameInput.val();
        _socketNameInput.text(_nameInput.val());
        $('#'+currentSoketNo).siblings('text').text(_nameInput.val());
        console.log(cData, currentSoketNo);
        
        saveAll();
                
        //hide modal
        $('#nameSettings').modal('hide');        
    });
    _postponeSettingsSave.on('click', function(e){
        cData.data[currentSoketNo].postpone = _postponeInput.val();
        _socketPostponeInput.text(_postponeInput.val());
        
        if(_postponeInput.val() > 60 || _postponeInput.val() < 0){
            alert('Please enter a value between 0 and 60');
        }else{           
            saveAll();                    
            //hide modal
            $('#postponeSettings').modal('hide'); 
        }
    });
    
    
    _soketSettingsSave.on('click', function(e){
        console.log('here');
        //socketDataSave REST  
    });
    
    function saveAll(){
        $.ajax({
                  method: 'POST',
                  url: '/socketDataSave',
                  data: cData,
                  cache: false,
                  timeout: 5000,
                }).done(function() {console.log( "success" );});
    }

});



