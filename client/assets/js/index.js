var app = new Vue({
  el: "#app",

  data: {

    taskAll: [],

    task: '',

    taskBelum: [],

    taskSudah: [],

    username: '',

    email: '',

    halo: 'Anjing babi'

  },

  methods: {

    readTask: function() {

      var token = localStorage.getItem('doit_token')

      axios.get(`http://localhost:3000/api/todolist/${token}/all`)
        .then((response) => {

          this.username = response.data.username

          this.email = response.data.email

          this.taskAll = response.data.task

          this.taskBelum = []

          this.taskSudah = []

          this.taskAll.forEach((task) => {

            task.createdAt = new Date(task.createdAt).toLocaleDateString()

            if(task.status == "belum selesai") {
              this.taskBelum.push(task)
            }

            else {
              this.taskSudah.push(task)
            }
          })

          this.taskBelum.reverse()
          this.taskSudah.reverse()

          console.log(this.taskAll);

        })
        .catch(function (error) {
          console.log(error);
        });

    },

    addTask: function() {

      var token = localStorage.getItem('doit_token')

      axios.put(`http://localhost:3000/api/todolist/${token}/add`, {
          detail: document.getElementById('task').value
        })
        .then((response) => {
          document.getElementById(('task')).value = ''
        })
        .catch((error) => {
          console.log(error);
        });

    },

    deletetask: function(idtask) {
      axios.put('http://localhost:3000/api/todolist/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMTE4YjZhMWM3NzE1MjU5OWQ3YTRkMyIsInVzZXJuYW1lIjoid2lzbnUiLCJlbWFpbCI6Indpc251QGdtYWlsLmNvbSIsImxvZ2luIjp0cnVlLCJpYXQiOjE1MTExMDI3OTZ9.BxdGmWYrP32XzRIL8qs486xb2nJSjnFvzM2kcY97rF4/delete', {
          id: idtask
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(idtask);
    },

    tandaiSudah: function(idtask) {

      var token = localStorage.getItem('doit_token')

      axios.put(`http://localhost:3000/api/todolist/${token}/tandaiselesai`, {
          id: idtask
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(idtask);
    },

    ceklogin() {
      if(localStorage.getItem("doit_token") === null){
          localStorage.removeItem("doit_token");
          window.location.replace("/");
      }
    },


    login() {
      axios.post('http://localhost:3000/api/user/signin', {
          email: document.getElementById('email').value,
          password: document.getElementById('password').value
        })
        .then(function (response) {
          console.log('yiha');
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      console.log(document.getElementById('email').value)
      console.log(document.getElementById('password').value);
    }

  },

  created: function() {
    this.ceklogin()
    this.readTask()

  }

})
