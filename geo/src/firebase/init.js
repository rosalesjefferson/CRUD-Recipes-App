import firebase from 'firebase'
import firestore from 'firebase/firestore'
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDhlil8vfsSs7AVRrFNuxB079OImK0rBLE",
    authDomain: "geoproject-88d36.firebaseapp.com",
    databaseURL: "https://geoproject-88d36.firebaseio.com",
    projectId: "geoproject-88d36",
    storageBucket: "geoproject-88d36.appspot.com",
    messagingSenderId: "65534981857",
    appId: "1:65534981857:web:7abda2ff60a4871828a9a0",
    measurementId: "G-FKGRC8EW2G"
  };
  // Initialize Firebase
  const dbfirebase = firebase.initializeApp(firebaseConfig);

  export default dbfirebase.firestore()
  