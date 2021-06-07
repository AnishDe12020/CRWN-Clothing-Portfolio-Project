import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

import fireabseConfig from "./firebase.config.json"

// try {
//     const fireabseConfig = require("./firebase.config.json")
// }
// catch(err) {
//     console.log("Using ENV config")
// }

const dotenv = require("dotenv")
dotenv.config()

const config = {
    apiKey: process.env.FIREBASE_API_KEY || fireabseConfig.FIREBASE.API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || fireabseConfig.FIREBASE.AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID || fireabseConfig.FIREBASE.PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || fireabseConfig.FIREBASE.STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || fireabseConfig.FIREBASE.MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID || fireabseConfig.FIREBASE.APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || fireabseConfig.FIREBASE.MEASUREMENT_ID
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get()

    if(!snapshot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch(error) {
            console.log("Error creating user", error.message)
        }
    }

    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase