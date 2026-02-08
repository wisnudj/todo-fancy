<template>
<section class="hero is-bold">
    <div class="hero-body">
      <div class="container pt-6">
        <div class="columns is-centered">
          <div class="column is-half-tablet is-4-desktop">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  <h2 class="has-text-centered has-text-weight-bold mb-2">Todo App</h2>
                  <p class="has-text-centered is-size-6 has-text-grey mb-5">Kelola tugas harianmu dengan sederhana</p>
                  <div class="tabs is-toggle is-fullwidth">
                    <ul class="ml-0">
                      <li class="is-active"><a>Login</a></li>
                      <li><a>Register</a></li>
                    </ul>
                  </div>
                  <form action="">
                    <div class="field">
                      <label class="label">Email</label>
                      <div class="control has-icons-left">
                        <input type="email" class="input" placeholder="email@example.com" />
                        <span class="icon is-small is-left">
                          <i class="fas fa-envelope"></i>
                        </span>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Password</label>
                      <div class="control has-icons-left">
                        <input type="password" class="input" placeholder="********" />
                        <span class="icon is-small is-left">
                          <i class="fas fa-lock"></i>
                        </span>
                      </div>
                    </div>
                    <div class="field mt-3">
                      <div class="control">
                        <button class="button is-primary is-fullwidth">Login</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>