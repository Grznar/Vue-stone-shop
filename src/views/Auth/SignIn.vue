<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4 border">
        <div class="shadow-sm">
          <div class="card-body p-4">
            <h4 class="text-center mb-4">Sign In</h4>
            <form @submit.prevent="handleSignIn">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" v-model="form.email" class="form-control" id="email" required />
              </div>
              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  v-model="form.password"
                  class="form-control"
                  id="password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-success w-100">
                <span
                  v-if="authStore.isLoading"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                Sign In
              </button>
              <div class="alert alert-danger mt-3 mb-0" v-if="error.length > 0">{{ error }}</div>
            </form>
            <p class="mt-3 form-label text-center">
              Don't have an account?
              <router-link :to="{ name: APP_ROUTE_NAMES.SIGN_UP }">Register here</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSwal } from '@/utility/useSwal'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useAuthStore } from '@/stores/authStore.js'
const authStore = useAuthStore()
const { showSuccess, showError, showConfirm } = useSwal()
const router = useRouter()
const error = ref('')
const form = reactive({
  email: '',
  password: '',
})

const handleSignIn = async () => {
  try {
    error.value = ''
    await authStore.signInUser(form.email, form.password)
    router.push({ name: APP_ROUTE_NAMES.HOME })
  } catch (err) {
    error.value = err.message
    showError(err.message)
  }
}
</script>
