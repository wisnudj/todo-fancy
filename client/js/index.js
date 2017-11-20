$(document).ready(function() {
  if(!localStorage.token) {
    window.location.replace("/signin.html")
  }
  console.log(localStorage.token);

  $.ajax({
    url: `http://localhost:3000/api/todolist/${localStorage.token}/all`,
    success: function(result){
      console.log(result);
      showtodo(result)
    }
  })

  $.ajax({
      url:`http://localhost:3000/api/todolist/${localStorage.token}/add`,
      method:"PUT",
      dataType:"json",
      data:{judul: "terlalu", detail: "terlalu pusing memikirkan tugas"},
      success:function(data){
        console.log(data);
      },
      error:function(){
          
      }
  })

})


function showtodo(obj) {
  obj.task.forEach((todo) => {
    $("#list-todo").append(
      `
      <tr>
        <td>${todo.judul}</td>
        <td>${todo.detail}</td>
        <td>${todo.status}</td>
      </tr>
      `
    )
  })
}
