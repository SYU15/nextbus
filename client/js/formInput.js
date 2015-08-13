$(document).ready(function(){
  
  $('.selectBus').click(function(){
    $('rect').hide();
    $('.busOptions :selected').each(function (index, element) {
      var busClass = '.' + $(this).attr('value');
      $(busClass).show();
    });
  });

});
