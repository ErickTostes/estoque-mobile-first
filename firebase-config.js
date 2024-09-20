import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDl_T8lh5CjtKEkXYDlm2Ytuort6iA-2CU",
  authDomain: "estoque-mobile-first.firebaseapp.com",
  projectId: "estoque-mobile-first",
  storageBucket: "estoque-mobile-first.appspot.com",
  messagingSenderId: "748514871438",
  appId: "1:748514871438:web:39bffbcb296e5db84061df"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const db = getFirestore(app);


export { auth, db };
