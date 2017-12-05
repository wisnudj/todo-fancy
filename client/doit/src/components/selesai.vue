<template lang="html">
  <div class="container">
    <div class="list-group lebar">
      <a href="#" class="list-group-item list-group-item-action active">
        <h1>Selesai</h1>
      </a>
      <a class="list-group-item list-group-item-action" v-for="task in tasksudah">
        <h3>{{task.detail}}</h3>
        <small>{{task.createdAt | formatdate}}</small>
        <span class="simbol">
          <a href="#" v-on:click="deletetask(task)"><i class="fa fa-trash" aria-hidden="true"></i></a>
          <a href="#" v-on:click="editTask(task)" data-toggle="modal" data-target="#editmodal"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'sudah',
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
    tasksudah () {
      return this.$store.getters.tasksudah
    }
  },
  methods: {
    ...mapActions([
      'getAllTask',
      'deletetask'
    ])
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
