var updateShowBuses = function() {
  console.log('called');
  //hide all buses by default
  $('rect').hide();
  //iterate through selected options
  $('.busOptions :selected').each(function (index, element) {
    //get value from html option, convert to class
    var busClass = '.' + $(this).attr('value');
    //show buses with selected class
    $(busClass).show();
  });
};

$(document).ready(function(){

 
 //listens to see if any options in html form have been clicked
  $('.selectBus').click(function(){
    updateShowBuses();
  });

//fires when show all button is clicked
  $('.btn').click(function(){
    //show all buses
    $('rect').show();
    //remove selected options in form field
    $("option:selected").removeAttr("selected");
  });

});
