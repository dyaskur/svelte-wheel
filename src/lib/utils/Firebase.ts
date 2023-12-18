import { initializeApp, getApp, getApps } from 'firebase/app'
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword
} from 'firebase/auth'
import {
  getFirestore, collection, doc, setDoc, updateDoc
} from 'firebase/firestore'
import {
  PUBLIC_FIREBASE_API_KEY, PUBLIC_FIREBASE_AUTH_DOMAIN,
  PUBLIC_FIREBASE_PROJECT_ID, PUBLIC_FIREBASE_STORAGE_BUCKET,
  PUBLIC_FIREBASE_MESSAGING_SENDER_ID, PUBLIC_FIREBASE_APP_ID,
  PUBLIC_FIREBASE_MEASUREMENT_ID
} from '$env/static/public'

export const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: PUBLIC_FIREBASE_APP_ID,
  measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
}

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth, email, password
  )
  await setDoc(doc(collection(db, 'users'), userCredential.user.uid), {
    email,
    createdAt: new Date(),
    lastActive: new Date(),
    uid: userCredential.user.uid,
    wheels: []
  })
  return userCredential.user
}

export const signInUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth, email, password
  )
  await updateDoc(doc(db, 'users', userCredential.user.uid), {
    lastActive: new Date()
  })
  return userCredential.user
}

export const signOutUser = async () => await auth.signOut()

export const getCurrentUser = () => auth.currentUser
