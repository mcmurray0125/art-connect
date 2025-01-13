import React, { useContext, useState, useEffect, createContext } from 'react'
import { auth, db, googleProvider } from "../firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword
} from "firebase/auth";

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    //Log in user with Google. Redirects away from your page.
    async function loginGoogle() {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    }

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const loginDemo = () => signInAnonymously(auth);
    
    const logout = () => auth.signOut();
    
    const resetPassword = (email) => sendPasswordResetEmail(auth, email);
    
    const emailChange = (email) => updateEmail(currentUser, email);
    
    const passwordChange = (password) => updatePassword(currentUser, password);
      
    // Watch for Authentication State Changes
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        setCurrentUser(user);
        setLoading(false);

        if (user) {
          const userDocRef = doc(db, "users", user.uid);

          // Check if the user document exists
          try {
            const userDocSnap = await getDoc(userDocRef);
            if (!userDocSnap.exists()) {
              // Create a new user document if it doesn't exist
              await setDoc(userDocRef, {
                uid: user.uid,
                email: user.email || null,
                displayName: user.displayName || "Anonymous",
                createdAt: new Date().toISOString(),
                profileImage: null,
                bio: "",
                saved: [],
                posts: [],
                followers: [],
                following: [],
              });
            }
          } catch (error) {
            console.error("Error setting user document:", error);
          }
        }
      });

      return () => unsubscribe(); // Cleanup on unmount
    }, []);
      
    const value = { 
        loading,
        currentUser,
        loginGoogle,
        login,
        loginDemo,
        signup,
        logout,
        resetPassword,
        emailChange,
        passwordChange
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}