
$( document ).ready(function() {
  $('.icon-bookmark').on('click' , function(){
    if($(this).hasClass("selected")){
      $(this).removeClass("selected");
    }else{
      $(this).addClass("selected");
    }
  });
  $('.load-more').click(function(){
    $.ajax({
      url: 'ajax.html',
      success: function(data){
        $('.load-more').hide();
        $('.load-more-data').html(data);
      }
    });
  });
  
});