$(document).ready(function(){
    
    var _addBtn = $('.add-gadget-btn');
    var _start = $('#sel1');
    var _end = $('#sel1');
    var _gadgetName = $('.gadget-name-inpt');
    var _currentGadgetArea = $('.currentGadgets');
    
    
    //event listeners
    _addBtn.on('click', function(e){
        
        _currentGadgetArea.append('<div class="gadgetAttrsBox">' + _gadgetName.val() + '</div>');
    });
    
    
    
    
    
    
    
    
    
    
    
    
    $.ajax({url: '/user', cache: false, timeout: 5000, dataType: "json",success: function(data, textStatus, jqXHR) {
    console.log(data);
    $("#hpvalue").append(data.HP);
    $("#energyvalue").append(data.ENERGY);
    }});
    
 
    
    
});