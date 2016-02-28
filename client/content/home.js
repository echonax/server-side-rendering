$(document).ready(function(){
    
    var _addBtn = $('.add-gadget-btn');
    var _start = $('#sel1');
    var _end = $('#sel1');
    var _gadgetName = $('.gadget-name-inpt');
    var _currentGadgetArea = $('.currentGadgets');
    var _outlets = $('.outlets');
    
    var _modalTitle = $('#myModalLabel');
    
    _outlets.on('click', function(e){
        _modalTitle.innerHTML = 'soket' + $.data(e.target, 'soket');
        console.log($.data(e.target, 'soket') );
       // $( this ).css( "stroke", "red" );
    });
    
        
        $.each(_outlets, function(i, v){
            $.data(v, 'soket', i);
            
        });
        
        
        $('#myModal').on('show.bs.modal', function (event) {
            
            var currentButton = event.relatedTarget; // Button that triggered the modal
            var recipient = $.data(currentButton, 'soket'); // Extract info from data-* attributes
            // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            var modal = $(this);
            modal.find('.modal-title').text('New message to soket no = ' + recipient);
            //modal.find('.modal-body input').val(recipient)
        });
});




    // $.ajax({url: '/user', cache: false, timeout: 5000, dataType: "json",success: function(data, textStatus, jqXHR) {
    // console.log(data);
    // $("#hpvalue").append(data.HP);
    // $("#energyvalue").append(data.ENERGY);
    // }});
    // 