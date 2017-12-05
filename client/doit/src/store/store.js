import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    tasks: []
  },

  mutations: {
    setAllTask (state, payload) {
      state.tasks = payload
    },

    setUpdateTask (state, payload) {
      var accesstoken = localStorage.getItem('token')
      http.get(`/api/todolist/${accesstoken}/all`).then(({data}) => {
        state.tasks = data.task
      }).catch((err) => {
        console.log(err)
      })
    },

    setDeleteTask (state, payload) {
      var accesstoken = localStorage.getItem('token')
      http.get(`/api/todolist/${accesstoken}/all`).then(({data}) => {
        state.tasks = data.task
      }).catch((err) => {
        console.log(err)
      })
    },

    setAddTask (state, payload) {
      var accesstoken = localStorage.getItem('token')
      http.get(`/api/todolist/${accesstoken}/all`).then(({data}) => {
        state.tasks = data.task
      }).catch((err) => {
        console.log(err)
      })
    }
  },

  getters: {
    taskbelum: function (state) {
      var taskbelum = []
      state.tasks.forEach((tas) => {
        if (tas.status === 'belum selesai') {
          taskbelum.push(tas)
        }
      })
      return taskbelum
    },

    tasksudah: function (state) {
      var tasksudah = []
      state.tasks.forEach((tas) => {
        if (tas.status === 'selesai') {
          tasksudah.push(tas)
        }
      })
      console.log(tasksudah)
      return tasksudah
    }
  },

  actions: {
    getAllTask: function ({commit}) {
      var accesstoken = localStorage.getItem('token')

      http.get(`/api/todolist/${accesstoken}/all`).then(({data}) => {
        commit('setAllTask', data.task)
      }).catch((err) => {
        console.log(err)
      })
    },

    tandaiselesai: function ({commit}, task) {
      var accesstoken = localStorage.getItem('token')

      http.put(`/api/todolist/${accesstoken}/tandaiselesai`, {
        id: task._id
      }).then(({data}) => {
        console.log('kena')
        commit('setUpdateTask', task)
      }).catch((err) => {
        console.log(err)
      })
    },

    deletetask: function ({commit}, task) {
      var accesstoken = localStorage.getItem('token')

      http.put(`/api/todolist/${accesstoken}/delete`, {
        id: task._id
      }).then(({data}) => {
        commit('setDeleteTask', task)
      })
    },

    addTask: function ({commit}, detail) {
      var accesstoken = localStorage.getItem('token')
      http.put(`/api/todolist/${accesstoken}/add`, {
        detail: detail
      }).then(({data}) => {
        commit('setAddTask')
      })
    }
  }
})
