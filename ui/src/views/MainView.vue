<template>
  <div class="container is-max-tablet pl-6 pr-6 pt-4">
    <nav class="is-flex is-justify-content-space-between is-align-items-center mb-6">
      <div class="logo has-text-centered">
        <div class="is-size-5 has-text-weight-semibold">Todo App</div>
        <div class="is-size-7 has-text-weight-medium">{{ userEmail }}</div>
      </div>
      <div class="">
        <button class="button is-light is-dark is-size-7" @click="handleLogout">Logout</button>
      </div>
    </nav>
    <div class="card mb-6 p-4">
      <div class="columns">
        <div class="column is-three-quarters"><input class="input" type="text" placeholder="Task" v-model="inputTitle" @keyup.enter="handleAdd"></div>
        <div class="column"><button class="button is-fullwidth is-primary has-text-white" @click="handleAdd">Add</button></div>
      </div>
    </div>
    <div class="panel is-link pb-1">
      <p class="panel-heading is-size-6">Task List</p>
      <p class="panel-tabs">
        <a class="is-active">All ({{ totalTask }})</a>
        <a>Active ({{ totalActive }})</a>
        <a>Completed ({{ totalCompleted }}) </a>
      </p>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Search" />
          <span class="icon is-left">
            <i class="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <TransitionGroup name="task-list" tag="div">
        <div class="panel-block" v-for="task in tasks" :key="task.id">
          <label class="checkbox">
            <input type="checkbox" :checked="task.completed" @change="toggleCheck(task, $event)" />
            <span :class="{ 'has-text-grey-light': task.completed }">
              {{ task.title }}
            </span>
          </label>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style>
.task-list-enter-active,
.task-list-leave-active,
.task-list-move {
  transition: all 0.25s ease;
}

.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue"

import { getTasks, addTask, updateTask, type TaskItem, type TaskPagination } from "@/services/task-service"
import { ApiError } from "@/services/error"
import { useRouter } from 'vue-router'

const tasks = ref<TaskItem[]>([])
const totalTask = ref<number>(0)
const totalActive = ref<number>(0)
const totalCompleted = ref<number>(0)

const inputTitle = ref<string>("")
const userEmail = ref<string>("")

const router = useRouter()

async function fetchTasks() : Promise<void> {
  try {
    const token = localStorage.getItem("token") || ""
    const response: TaskPagination = await getTasks(token, "")
    
    tasks.value = response.items
    totalTask.value = response.total
    totalActive.value = response.totalActiveTask
    totalCompleted.value = response.totalCompletedTask
  }
  catch(err) {
    if (err instanceof ApiError) {
      if(err.message === "token expired") {
        localStorage.removeItem('token')
        router.push('/auth')
        return
      }
    }
  }
}

async function handleAdd() : Promise<void> {
  try {
    const token = localStorage.getItem("token") || ""
    if(inputTitle.value == "") return
    
    const newTask: TaskItem = await addTask(token, inputTitle.value)
    
    tasks.value.unshift(newTask)
    totalActive.value += 1
    totalTask.value += 1

    inputTitle.value = ""
  }
  catch(err) {
    if(err instanceof ApiError) {
      if(err.message === "token expired") {
        localStorage.removeItem("token")
        localStorage.removeItem("user_email")
        router.push("/auth")
        return
      }
    }
  }
}

function handleLogout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user_email")
  router.push("/auth")
}

async function toggleCheck(task: TaskItem, event: Event) : Promise<void> {
  const target = event.target as HTMLInputElement
  task.completed = target.checked

  try {    
    const token = localStorage.getItem("token") || ""
    const updatedTask: TaskItem = await updateTask(token, task.id, undefined, task.completed)
    
    totalCompleted.value = (target.checked) ? totalCompleted.value + 1 : totalCompleted.value - 1
    totalActive.value = (target.checked) ? totalActive.value - 1 : totalActive.value + 1

    const index: number = tasks.value.findIndex((el) => el.id === task.id)
    if(index !== -1) {
      tasks.value[index] = updatedTask
      tasks.value.sort((a: TaskItem, b: TaskItem) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    }
  }
  catch(err) {
    target.checked = !target.checked
    task.completed = target.checked
  }
}

onMounted(() => {
  fetchTasks()
  userEmail.value = localStorage.getItem("user_email") || ""
})


</script>