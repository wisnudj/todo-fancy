<template>
  <div class="container is-max-tablet pl-6 pr-6 pt-4">
    <nav class="is-flex is-justify-content-space-between is-align-items-center mb-6">
      <div class="logo has-text-centered">
        <div class="is-size-5 has-text-weight-semibold">Todo App</div>
        <div class="is-size-7 has-text-weight-medium">wisnu@mail.com</div>
      </div>
      <div class="">
        <button class="button is-light is-dark is-size-7">Logout</button>
      </div>
    </nav>
    <div class="card mb-6 p-4">
      <div class="columns">
        <div class="column is-three-quarters"><input class="input" type="text" placeholder="Task"></div>
        <div class="column"><button class="button is-fullwidth is-primary has-text-white">Add</button></div>
      </div>
    </div>
    <div class="panel is-link">
      <p class="panel-heading is-size-6">Task List</p>
      <p class="panel-tabs">
        <a class="is-active">All</a>
        <a>Active</a>
        <a>Completed</a>
      </p>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Search" />
          <span class="icon is-left">
            <i class="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <a class="panel-block">
        <span class="panel-icon">
          <i class="fas fa-book" aria-hidden="true"></i>
        </span>
        shalat tarawih
      </a>
    </div>
  </div>
</template>