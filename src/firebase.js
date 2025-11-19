// Firebase initialization — uses your config
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCjKptJE-HXalDeubq6UzQyfHj5sMzvjZg',
  authDomain: 'digital-e-gram-5db28.firebaseapp.com',
  projectId: 'digital-e-gram-5db28',
  storageBucket: 'digital-e-gram-5db28.firebasestorage.app',
  messagingSenderId: '552528468730',
  appId: '1:552528468730:web:5f3fabad868d7c00ef0743',
  measurementId: 'G-6FZD0ERK17'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
