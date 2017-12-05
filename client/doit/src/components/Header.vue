<template lang="html">
  <div class="">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">Doit</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#" data-toggle="modal" data-target="#loginmodal"><i class="fa fa-plus-circle" aria-hidden="true"></i> Add Task</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <button class="btn btn-secondary my-2 my-sm-0" type="submit" v-on:click="logout">Logout</button>
        </form>
      </div>
    </nav>
    <!-- add task -->
    <div class="modal fade" id="loginmodal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <fieldset>
                <div class="form-group">
                  <label for="exampleInputEmail1">Task</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter task" v-model="detail">
                </div>
              </fieldset>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="tambahTask" data-dismiss="modal">Save changes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      detail: ''
    }
  },

  methods: {
    ...mapActions([
      'addTask'
    ]),
    tambahTask () {
      this.addTask(this.detail)
      this.detail = ''
    },
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
</style>
