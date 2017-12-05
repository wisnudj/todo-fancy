<template>
  <div class="container">
    <div class="hello">
      <div class="card text-white bg-primary mb-3 tengah" style="max-width: 20rem;">
        <div class="card-header">DoIT</div>
        <div class="card-body">
          <h4 class="card-title">Please Login</h4>
          <fieldset>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
            </div>
          </fieldset>
          <button type="submit" v-on:click="login" class="btn btn-secondary">Login</button>
          <button type="submit" v-on:click="loginfb" class="btn btn-secondary">Login facebook</button>
          <button type="submit" v-on:click="toregister" class="btn btn-secondary">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      email: '',
      password: ''
    }
  },

  methods: {
    login: function () {
      axios.post('http://localhost:3000/api/user/signin', {
        email: this.email,
        password: this.password
      }).then((response) => {
        localStorage.setItem('token', response.data.token)
        this.email = ''
        this.password = ''
        this.$router.push('/home')
      })
    },

    toregister: function () {
      this.$router.push('/register')
    },
    loginfb: function () {
      // eslint-disable-next-line
      FB.login((response) => {
        console.log(response.authResponse.accessToken)
        console.log(response.authResponse.userID)
        axios.post('http://localhost:3000/api/user/facebook-signin', {
          accessToken: response.authResponse.accessToken,
          userID: response.authResponse.userID
        }).then((response) => {
          localStorage.setItem('token', response.data.token)
          this.$router.push('/home')
          console.log(response.data.token)
        })
      }, {scoped: 'email'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tengah {
  margin: 0 auto;
  margin-top: 10%;
}
</style>
