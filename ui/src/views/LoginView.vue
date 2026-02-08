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
                      <li :class="{ 'is-active': activeTab === 'login' }"><a @click.prevent="activeTab = 'login'">Login</a></li>
                      <li :class="{ 'is-active': activeTab === 'register' }"><a @click.prevent="activeTab = 'register'">Register</a></li>
                    </ul>
                  </div>
                  <div v-if="activeTab === 'login'">
                    <form @submit.prevent="handleLogin" novalidate>
                      <div class="field">
                        <label class="label">Email</label>
                        <div class="control has-icons-left">
                          <input type="email" class="input" placeholder="email@example.com" v-model.trim="loginForm.email" />
                          <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                          </span>
                        </div>
                        <p class="help is-danger" v-if="loginForm.emailError">{{ loginForm.emailError }}</p>
                      </div>
                      <div class="field">
                        <label class="label">Password</label>
                        <div class="control has-icons-left">
                          <input type="password" class="input" placeholder="********" v-model.trim="loginForm.password" />
                          <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                          </span>
                        </div>
                        <p class="help is-danger" v-if="loginForm.passwordError">{{ loginForm.passwordError }}</p>
                      </div>
                      <div class="field mt-3">
                        <div class="control">
                          <button type="submit" class="button is-primary is-fullwidth">Login</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div v-else>
                    <form @submit.prevent="handleRegister" novalidate>
                      <div class="field">
                        <label class="label">Email</label>
                        <div class="control has-icons-left">
                          <input type="email" class="input" placeholder="email@example.com" v-model.trim="registerForm.email" />
                          <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                          </span>
                        </div>
                        <p class="help is-danger" v-if="registerForm.emailError">{{ registerForm.emailError }}</p>
                      </div>
                      <div class="field">
                        <label class="label">Password</label>
                        <div class="control has-icons-left">
                          <input type="password" class="input" placeholder="••••••••" v-model.trim="registerForm.password" />
                          <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                          </span>
                        </div>
                        <p class="help is-danger" v-if="registerForm.passwordError">{{ registerForm.passwordError }}</p>
                      </div>
                      <div class="field">
                        <label class="label">Confirm Password</label>
                        <div class="control has-icons-left">
                          <input type="password" class="input" placeholder="••••••••" v-model.trim="registerForm.confirmPassword" />
                          <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                          </span>
                        </div>
                        <p class="help is-danger" v-if="registerForm.confirmPasswordError">{{ registerForm.confirmPasswordError }}</p>
                      </div>
                      <div class="field mt-3">
                        <div class="control">
                          <button type="submit" class="button is-primary is-fullwidth">Register</button>
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const activeTab = ref<'login' | 'register'>('login')

const loginForm = reactive<{
  email: string;
  password: string;
  emailError: string | null;
  passwordError: string | null;
}>({
  email: '',
  password: '',
  emailError: null,
  passwordError: null,
})

const registerForm = reactive<{
  email: string;
  password: string;
  confirmPassword: string;
  emailError: string | null;
  passwordError: string | null;
  confirmPasswordError: string | null
}>({
  email: '',
  password: '',
  confirmPassword: '',
  emailError: null,
  passwordError: null,
  confirmPasswordError: null,
})

function validateEmail(email : string) : boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePassword(password : string) : boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

function validateLoginForm() : boolean {
  if (loginForm.email === '') {
    loginForm.emailError = 'Email is required'
  }
  else if (!validateEmail(loginForm.email)) {
    loginForm.emailError = 'Email is invalid'
  }
  else {
    loginForm.emailError = null
  }

  if (loginForm.password === '') {
    loginForm.passwordError = 'Password is required'
  }
  else if (!validatePassword(loginForm.password)) {
    loginForm.passwordError = 'Password is invalid'
  }
  else {
    loginForm.passwordError = null
  }

  if (loginForm.emailError || loginForm.passwordError) {
    return false
  }

  return true
}

function validateRegisterForm() : boolean {
  if (registerForm.email === '') {
    registerForm.emailError = 'Email is required'
  }
  else if (!validateEmail(registerForm.email)) {
    registerForm.emailError = 'Email is invalid'
  }
  else {
    registerForm.emailError = null
  }

  if (registerForm.password === '') {
    registerForm.passwordError = 'Password is required'
  }
  else if (!validatePassword(registerForm.password)) {
    console.log("Password is invalid", registerForm.password)
    registerForm.passwordError = 'Password is invalid'
  }
  else {
    registerForm.passwordError = null
  }

  if (registerForm.confirmPassword === '') {
    registerForm.confirmPasswordError = 'Confirm Password is required'
  }
  else if (registerForm.confirmPassword !== registerForm.password) {
    registerForm.confirmPasswordError = 'Confirm Password does not match'
  }
  else {
    registerForm.confirmPasswordError = null
  }

  if (registerForm.emailError || registerForm.passwordError || registerForm.confirmPasswordError) {
    return false
  }

  return true
}

function handleLogin() : void {
  if (!validateLoginForm()) return
  console.log(loginForm)
}

function handleRegister() : void {
  if (!validateRegisterForm()) return
  console.log(registerForm)
}


</script>
