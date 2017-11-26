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

      axios.get('http://localhost:3000/api/todolist/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMTE4YjZhMWM3NzE1MjU5OWQ3YTRkMyIsInVzZXJuYW1lIjoid2lzbnUiLCJlbWFpbCI6Indpc251QGdtYWlsLmNvbSIsImxvZ2luIjp0cnVlLCJpYXQiOjE1MTExMDI3OTZ9.BxdGmWYrP32XzRIL8qs486xb2nJSjnFvzM2kcY97rF4/all')
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

      axios.put('http://localhost:3000/api/todolist/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMTE4YjZhMWM3NzE1MjU5OWQ3YTRkMyIsInVzZXJuYW1lIjoid2lzbnUiLCJlbWFpbCI6Indpc251QGdtYWlsLmNvbSIsImxvZ2luIjp0cnVlLCJpYXQiOjE1MTExMDI3OTZ9.BxdGmWYrP32XzRIL8qs486xb2nJSjnFvzM2kcY97rF4/add', {
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
      axios.put('http://localhost:3000/api/todolist/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMTE4YjZhMWM3NzE1MjU5OWQ3YTRkMyIsInVzZXJuYW1lIjoid2lzbnUiLCJlbWFpbCI6Indpc251QGdtYWlsLmNvbSIsImxvZ2luIjp0cnVlLCJpYXQiOjE1MTExMDI3OTZ9.BxdGmWYrP32XzRIL8qs486xb2nJSjnFvzM2kcY97rF4/tandaiselesai', {
          id: idtask
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(idtask);
    }

  },

  created: function() {

    this.readTask()

  }

})
