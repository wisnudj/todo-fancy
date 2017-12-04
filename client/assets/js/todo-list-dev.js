Vue.component('todo-list-dev', {
  template: `

  <div>

    <div class="container">
      <h4>Belum selesai</h4>
      <div class="well well-lg" v-for="(task, index) in taskbelum">
        <div class="row">
          <div class="col-md-10">
            <p>{{task.detail}}</p>
            <p>{{task.createdAt}}</p>
          </div>
          <div class="col-md-2">
            <a href="" v-on:click="tandaisudah(task._id)"><span class="	glyphicon glyphicon-unchecked"></span> </a>
            <a href="" v-on:click="hapus(task._id)"><span class="glyphicon glyphicon-trash"></span> </a>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <h4>Selesai</h4>
      <div class="well well-lg" v-for="(task, index) in tasksudah">
        <div class="row">
          <div class="col-md-10">
            <p>{{task.detail}}</p>
            <p>{{task.createdAt}}</p>
          </div>
          <div class="col-md-2">
            <a href=""><span class="	glyphicon glyphicon-ok"></span> </a>
            <a href="" v-on:click="hapus(task._id)"><span class="glyphicon glyphicon-trash"></span> </a>
          </div>
        </div>
      </div>
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
