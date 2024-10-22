import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBRiNacoCPOUdaHYQBThMlpUyE9xmQNY2U",
  authDomain: "e-comm-fa613.firebaseapp.com",
  projectId: "e-comm-fa613",
  storageBucket: "e-comm-fa613.appspot.com",
  messagingSenderId: "129999298393",
  appId: "1:129999298393:web:7d45eb6a4558d4d5fef648",
  databaseURL: "https://e-comm-fa613-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);

const realtimeDb = getDatabase(app);
const firestoreDb = getFirestore(app);
const auth = getAuth(app);

export { realtimeDb, firestoreDb, auth }; 
