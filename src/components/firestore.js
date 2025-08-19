// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyABgNrmU1SKC4tH1ttJDcEibG079249Qs0",
authDomain: "jquery-5da05.firebaseapp.com",
databaseURL: "https://jquery-5da05-default-rtdb.firebaseio.com",
projectId: "jquery-5da05",
storageBucket: "jquery-5da05.appspot.com",
messagingSenderId: "260682608385",
appId: "1:260682608385:web:84475cc7895af97a8e3500",
measurementId: "G-PL507TK51M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
