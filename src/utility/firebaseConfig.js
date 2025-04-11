import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDA0D3lwSg-UXfM7JjY011xu2aeyq6blww',
  authDomain: 'shop-39f15.firebaseapp.com',
  projectId: 'shop-39f15',
  storageBucket: 'shop-39f15.firebasestorage.app',
  messagingSenderId: '919314876100',
  appId: '1:919314876100:web:b5d833287ebf36f3872b91',
  measurementId: 'G-87Q88RH3T6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const analytics = getAnalytics(app)
const auth = getAuth(app)
export { app as firebaseApp, db, auth }
