import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCIH6-oTSEs7u3X13NNh2J9C0yNPgdtNiA",
    authDomain: "prcross-22ab8.firebaseapp.com",
    databaseURL: "https://prcross-22ab8.firebaseio.com",
    projectId: "prcross-22ab8",
    storageBucket: "prcross-22ab8.appspot.com",
    messagingSenderId: "901747091393",
    appId: "1:901747091393:web:264236fdfb216ca5eff140",
    measurementId: "G-M7PEJ5QETF"
  };
export default firebase.initializeApp(firebaseConfig);
export const FBDatabase = firebase.database();
