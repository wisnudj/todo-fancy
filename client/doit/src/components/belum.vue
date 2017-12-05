<template lang="html">
  <div class="container">
      <div class="list-group lebar">
        <a href="#" class="list-group-item list-group-item-action active">
          <h1>Belum Selesai</h1>
        </a>
        <a class="list-group-item list-group-item-action" v-for="task in taskbelum">
          <h3>{{task.detail}}</h3>
          <small>{{task.createdAt | formatdate}}</small>
          <span class="simbol">
            <a href="#" v-on:click="deletetask(task)"><i class="fa fa-trash" aria-hidden="true"></i></a>
            <a href="#" v-on:click="tandaiselesai(task)"><i class="fa fa-check" aria-hidden="true"></i></a>
            <a href="#" v-on:click="editTask(task)" data-toggle="modal" data-target="#editmodal"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
          </span>
        </a>
      </div>
      <!-- edit modal -->
      <div class="modal fade" id="editmodal">
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
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter task" v-model="editdetail.detail">
                  </div>
                </fieldset>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" v-on:click="updatetask(editdetail)" data-dismiss="modal">Save changes</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'belum',
  data () {
    return {
      editdetail: {
        id: '',
        detail: ''
      }
    }
  },
  computed: {
    ...mapState([
      'tasks'
    ]),
    taskbelum () {
      return this.$store.getters.taskbelum
    }
  },
  methods: {
    ...mapActions([
      'getAllTask',
      'tandaiselesai',
      'deletetask'
    ]),

    editTask (task) {
      this.editdetail.detail = task.detail
      this.editdetail.id = task.id
    }
  },
  created () {
    this.getAllTask()
  }
}
</script>

<style scoped>
  .container {
    margin-top: 28px;
    font-size: 18px;
  }

  .lebar {
    width: 1100px;
  }

  .simbol {
    float: right
  }
  i {
    padding-left: 20px;
  }
</style>
