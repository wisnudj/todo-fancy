<template>
  <div class="container">
    <div class="hello">
      <div class="card text-white bg-primary mb-3 tengah" style="max-width: 20rem;">
        <div class="card-header">DoIT</div>
        <div class="card-body">
          <h4 class="card-title">Please Register</h4>
          <fieldset>
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" v-model="name">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
            </div>
          </fieldset>
          <button type="submit" v-on:click="register" class="btn btn-secondary">register</button>
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
      password: '',
      name: ''
    }
  },

  methods: {
    register: function () {
      axios.post('http://localhost:3000/api/user/signup', {
        username: this.name,
        email: this.email,
        password: this.password
      }).then((response) => {
        this.name = ''
        this.email = ''
        this.password = ''
        this.$router.push('/')
      }).catch((err) => {
        console.log(err)
      })
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
