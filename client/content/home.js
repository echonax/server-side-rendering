$(document).ready(function () {
    //fields
    var _outlets = $('.outlets');
    var _soketSettingsSave = $('#soketSettingsSave');
    var _nameSettingsSave = $('#nameSettingsSave');
    var _nameInput = $('#nameInput');
    var _soketData = {};
    var _modalTitle = $('#myModalLabel');
    var _postponeSelector = $('#postponeSelector');
    
    //AJAX DATA
    var _socketNameInput = $('#socketNameInput');
    var _isOn = false;
    var _currentSocket = 999;    
    var _startTime = $('#startDate');
    var _endTime = $('#endDate');
    
     
        
    //isOn state
    $('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
        console.log(state); // true | false
        _isOn = state;
      });
    
    
    //init
    _outlets.on('click', function (e) {
        _currentSocket = $.data(e.target, 'soket');
        
         $.ajax({url: '/getJSON', cache: false, timeout: 5000, dataType: "json",success: function(data, textStatus, jqXHR) {
                     console.log(data);
                     _soketData = data;
                     _socketNameInput.text(_soketData.name);
                     _modalTitle.text(_currentSocket + " no'lu priz için ayarlar");
                     $("[name='my-checkbox']").bootstrapSwitch('state',_soketData.isOn);
             }});
             
             
        $('#socketSettings').modal('show');
        
    });


    $.each(_outlets, function (i, v) {
        $.data(v, 'soket', i);
    });


    $('#socketSettings').on('shown', function (event) {
        console.log('here', event);        

        var modal = $(this);
       // modal.find('.modal-title').text(_currentSocket + " no'lu priz için ayarlar" );
        _startTime.val('11:31');
        _endTime.val('11:32');
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
    
    
    
    
    
    
    //SAVES
    _nameSettingsSave.on('click', function(e){
        console.log('clicked save');        
        console.log(name);
        var name = _nameInput.val();
        _socketNameInput.text(name);
        $('#outlet1').siblings('text').text(localStorage.getItem("0name"));
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
        $.ajax({
                  method: 'POST',
                  url: '/postJSON',
                  dataType: 'json',
                  data: JSON.stringify(obj),
                  cache: false,
                  timeout: 5000
                }).done(function() {
                    console.log( "success" );
                  })
                  .fail(function(xhr, textStatus, errorThrown) {
                    console.log("1)"+JSON.stringify(xhr) );
                  console.log("2)"+textStatus);
                  console.log("3)"+errorThrown);
                  })
                  .always(function() {
                    console.log("complete");
          });
    });

});



