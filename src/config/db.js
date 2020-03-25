import Firebase from 'firebase';
 let config = {
    apiKey: "AIzaSyDGbnN9ce6IHGZBAj9ppaVAZ7cfPGq0z_g",
    authDomain: "assignment-a2691.firebaseapp.com",
    databaseURL: "https://assignment-a2691.firebaseio.com",
    projectId: "assignment-a2691",
    storageBucket: "assignment-a2691.appspot.com",
    messagingSenderId: "402602316241"
  };
let app = Firebase.initializeApp(config);
console.log(Firebase)
export const db = app.database();