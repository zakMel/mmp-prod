// import * as firebase from 'firebase/app'
// Then you can import {firestore} from './yourconfigfile.js'  and you can get started using firestore

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAHsjH36Ex2QJBdsNH-BPrl4X8dKzOEwyo",
    authDomain: "macromealplanner-1d75a.firebaseapp.com",
    databaseURL: "https://macromealplanner-1d75a.firebaseio.com",
    projectId: "macromealplanner-1d75a",
    storageBucket: "macromealplanner-1d75a.appspot.com",
    messagingSenderId: "547519324291",
    appId: "1:547519324291:web:bca1f41a46f8f6846f7bb6",
    measurementId: "G-V94PJ2D3YV"
  };

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
// export const db = firebase.storage()
export default firebase