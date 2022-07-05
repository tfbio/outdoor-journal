import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import app from '../firebase'
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  updateEmail,
} from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [authUser, setAuthUser] = useState()
  const [isLoadingAuthUser, setIsLoadingAuthUser] = useState(true)

  const auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, userCredential => {
      setAuthUser(userCredential)
      setIsLoadingAuthUser(false)
    })
    unsubscribe()
  }, [auth, authUser])

  async function signUp(name, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      setAuthUser(userCredential)
      await updateProfile(userCredential.user, { displayName: name })
    } catch (error) {
      return error.code
    }
  }

  async function updateUser(name, email) {
    console.log(name, email)
    console.log(authUser)
  }

  async function changePassword(password) {
    try {
      await updatePassword(authUser, password)
    } catch (error) {
      return error.code
    }
  }

  async function signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setAuthUser(userCredential)
      setIsLoadingAuthUser(false)
    } catch (error) {
      return error.code
    }
  }

  async function passwordReset(email) {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      return error.code
    }
    
  }

  async function logout() {
    await signOut(auth)
    setAuthUser()
    setIsLoadingAuthUser(false)
    navigate('/')
  }

  const value = { 
    authUser,
    signUp,
    signIn,
    logout,
    passwordReset,
    updateUser,
    changePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!isLoadingAuthUser && children}
    </AuthContext.Provider>
  )
}
