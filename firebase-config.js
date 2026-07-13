// ======================================
// ChargeWala Firebase Configuration
// ======================================

// Replace with your Firebase project's config
const firebaseConfig = {
  apiKey: "AIzaSyAj_26Qf9uN6obwrM2cDlp8tIDLjg9ztNU",
  authDomain: "chargemate-4ebe0.firebaseapp.com",
  projectId: "chargemate-4ebe0",
  storageBucket: "chargemate-4ebe0.firebasestorage.app",
  messagingSenderId: "163065620321",
  appId: "1:163065620321:web:3000066a0d16c69a150720",
  measurementId: "G-LC1MJCXCX6"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore
const db = firebase.firestore();