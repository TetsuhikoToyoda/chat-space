$(document).on('turbolinks:load', function() {

var search_list = $("#user-search-result");
var indicate_member = $("#chat-group-users");

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">
                  ${user.user_name}
                </p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.user_name}">追加</a>
              </div>`
  search_list.append(html);
}

function appendMember(user) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                <p class='chat-group-user__name'>
                  ${user.user_name}
                </p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  indicate_member.append(html);
}


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    console.log("success");
    $.ajax({
      type: 'GET',
      url: '/groups/search',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      $(document).on("click", ".user-search-add", function(){
        $(".chat-group-user").remove();
        users.forEach(function(user){
          appendMember(user);
        });
      })
      $(document).on("click", ".user-search-remove", function(){
        $("#chat-group-user-8").remove();
      })
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});
