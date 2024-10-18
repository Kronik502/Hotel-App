import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage


// Your web app's Firebase configuration (replace with your config object)
const firebaseConfig = {
  apiKey: "AIzaSyCQ2wruv66jeOXOr7G9V98XXMSKCQvIUag",
  authDomain: "deluxe-hotel-4a2c0.firebaseapp.com",
  projectId: "deluxe-hotel-4a2c0",
  storageBucket: "deluxe-hotel-4a2c0.appspot.com",
  messagingSenderId: "79966897419",
  appId: "1:79966897419:web:b28dc526dfbd90a3a40e0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app); // Firebase Auth
const db = initializeFirestore(app, {
  persistence: true // Enable offline persistence
});
const storage = getStorage(app); // Initialize Firebase Storage


// Export the services for use in other parts of your app
export { app, auth, db, storage };