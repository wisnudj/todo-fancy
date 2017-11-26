var app = new Vue({
  el: "#app",

  data: {

    halo: "yeah"

  },

  methods: {

    login() {
      axios.post('http://localhost:3000/api/user/signin', {
          email: document.getElementById('email').value,
          password: document.getElementById('password').value
        })
        .then(function (response) {
          localStorage.setItem("doit_token", response.data.token)
          window.location.replace("app.html")
        })
        .catch(function (error) {
          console.log(error);
        });

    },

    ceklogin() {
      
      if(localStorage.getItem("doit_token") !== null){
          window.location.replace("app.html");
      }
    }

  },

  created: function() {
    this.ceklogin()
    // this.readTask()

  }

})
