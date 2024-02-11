const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyCGH4U3ijxjZ1mDDxFL91oBjgyHWbDs0Yw",
    authDomain: "kinomax-7f44c.firebaseapp.com",
    projectId: "kinomax-7f44c",
    storageBucket: "kinomax-7f44c.appspot.com",
    messagingSenderId: "848048804170",
    appId: "1:848048804170:web:5d887cdcd5be8545bfb1b3",
    measurementId: "G-HQTTWY8SGY"
});

const myAppDB = firebaseApp.database()
const auth = firebaseApp.auth()
