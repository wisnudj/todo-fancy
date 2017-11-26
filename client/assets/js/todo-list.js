Vue.component('todo-list', {
  template: `

  <div class="">

    <div class="">
      <table>
        <tr>
          <td>Task</td>
          <td>Created At</td>
          <td>status</td>
        </tr>
        <tr v-for="(task, index) in taskbelum">
          <td><input type="checkbox" name="" value="" v-on:click="tandaisudah(task._id)">{{task.detail}}</td>
          <td>{{task.createdAt}}</td>
          <td>{{task.status}}</td>
          <td><button type="button" name="button">edit</button></td>
          <td><button type="button" name="button" v-on:click="hapus(task._id)" >delete</button></td>
          </tr>
      </table>
    </div>

    <div class="">
      <table>
        <tr>
          <td>Task</td>
          <td>Created At</td>
          <td>status</td>
        </tr>
        <tr v-for="(task, index) in tasksudah">
          <td>{{task.detail}}</td>
          <td>{{task.createdAt}}</td>
          <td>{{task.status}}</td>
          <td><button type="button" name="button">edit</button></td>
          <td><button type="button" name="button" v-on:click="hapus(task._id)">delete</button></td>
          </tr>
      </table>
    </div>
  </div>


  `,

  props: ['task', 'taskbelum', 'tasksudah'],

  data: function() {
    return {
      kerja: "full-stack"
    }
  },

  methods: {

    hapus: function(index) {
      this.$emit('hapus-satu', index)
    },

    tandaisudah: function(index) {
      this.$emit('tandai-sudah', index)
    }

  }
})
