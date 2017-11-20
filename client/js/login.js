$(document).ready(function() {

  $("#signin").click(function() {
    $.post("http://localhost:3000/api/user/signin",
    {
      email: $("#email").val(),
      password: $("#password").val()
    },
    function(data, status){
      localStorage.setItem("token", data.token)
      window.location.replace("http://127.0.0.1:8080")
    });
  })

})
