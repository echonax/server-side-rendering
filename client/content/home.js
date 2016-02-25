$(document).ready(function(){
$.ajax({url: '/user', cache: false, timeout: 5000, dataType: "json",success: function(data, textStatus, jqXHR) {
  console.log(data);
  $("#hpvalue").append(data.HP);
  $("#energyvalue").append(data.ENERGY);
}});
});