$(function(){
  $('#new-message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData (this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  })
});
