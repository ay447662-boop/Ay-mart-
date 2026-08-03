import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBc2UF6IRYS_TtBTLnoSuxqrAhjy2tYruk",
  authDomain: "aymart-4488a.firebaseapp.com",
  projectId: "aymart-4488a",
  storageBucket: "aymart-4488a.firebasestorage.app",
  messagingSenderId: "325089901941",
  appId: "1:325089901941:web:e35ade31fe25a270b7273c",
  measurementId: "G-WP9EWV7MS5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
