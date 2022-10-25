import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCC5S2gQvKj6zx7aAjh3TpZm1SWRyw_3Q8",
  authDomain: "fir-basics-e5ddc.firebaseapp.com",
  databaseURL: "https://fir-basics-e5ddc-default-rtdb.firebaseio.com",
  projectId: "fir-basics-e5ddc",
  storageBucket: "fir-basics-e5ddc.appspot.com",
  messagingSenderId: "411440386594",
  appId: "1:411440386594:web:63f874b5e51923cba7707b",
  measurementId: "G-4ELYNHEF9B"
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const storage = getStorage();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { firebase, db, storage, auth, provider };
