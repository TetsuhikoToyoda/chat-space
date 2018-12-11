$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var html = `<div class="chat-main__message">
                  <div class="chat-main__message--name">
                    ${message.user_name}
                  </div>
                  <div class="chat-main__message--time">
                    ${message.created_at}
                  </div>
                  <div class="chat-main__message--body">
                    <p>
                      ${message.content}
                    </p>
                    <img class="chat-main__message--body-image" src="${message.image}" alt="">
                  </div>
                </div>`
    return html;
  }
  $('#new-message').on('submit', function(e){
    e.preventDefault();
    $('.submit').removeAttr('data-disable-with');
    var formData = new FormData (this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message:last').append(html)
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast')
      $('.message').val('')
      $('#message_image').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
});
