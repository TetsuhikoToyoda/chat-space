$(document).on('turbolinks:load', function() {

  function buildHTML(message){
    var insertImage = '';
    if (message.image) {
      insertImage = `<img class="chat-main__message--body-image" src="${message.image}" alt="">`;
  }
    var html = `<div class="chat-main__message" data-message-id="${message.id}">
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
                    ${insertImage}
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
  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
  $.ajax({
    url: location.href,
    dataType: 'json'
  })
  .done(function(json) {
    var id = $('.chat-main__message:last').data('messageId');
    var insertHTML = '';
    json.messages.forEach(function(message) {
      if (message.id > id ) {
        insertHTML += buildHTML(message);
        $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast')
      }
    });
    $('.chat-main__message:last').prepend(insertHTML);
  })
  .fail(function(json) {
    alert('自動更新に失敗しました');
  })}
      else {
      clearInterval(interval);
      }
  } , 5000 );
});
