import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD2pS5ceU8XqJelybNpZaAdImvviLLZoc0",
    authDomain: "blog-spot-ce76e.firebaseapp.com",
    projectId: "blog-spot-ce76e",
    storageBucket: "blog-spot-ce76e.appspot.com",
    messagingSenderId: "83692468697",
    appId: "1:83692468697:web:adf6e1c890eacd0c4681c8",
    measurementId: "G-L9ZN037DW3"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;