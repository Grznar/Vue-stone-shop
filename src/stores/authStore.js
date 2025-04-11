import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db, auth } from '@/utility/firebaseConfig.js'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ROLE_ADMIN, ROLE_USER } from '@/constants/appconstants.js'
export const useAuthStore = defineStore('authStore', () => {
  const user = ref(null)
  const error = ref(null)
  const isLoading = ref(false)
  const role = ref(null)
  const isAuthenticated = computed(() => user.value !== null)
  const isAdmin = computed(() => role.value === ROLE_ADMIN)
  const signUpUser = async (email, password) => {
    isLoading.value = true
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        role: ROLE_USER,
        password: password,
      })
      user.value = null
      user.role = null
      error.value = null
    } catch (err) {
      console.log(err.message)
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }
  const signInUser = async (email, password) => {
    isLoading.value = true
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      user.value = userCredential.user
      error.value = null
    } catch (err) {
      console.log(err.message)
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }
  return {
    user,
    role,
    error,
    isLoading,
    signUpUser,
    signInUser,
    isAuthenticated,
    isAdmin,
  }
})
