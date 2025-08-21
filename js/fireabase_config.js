const firebaseConfig = {
    apiKey: "AIzaSyDFGP39tLMb2i2M60pX29OLPgQJbng7mWs",
    authDomain: "banhang-12c09.firebaseapp.com",
    projectId: "banhang-12c09",
    storageBucket: "banhang-12c09.firebasestorage.app",
    messagingSenderId: "369058075",
    appId: "1:369058075:web:96ee319e302daa0b1f33be",
    measurementId: "G-6GYZ0LCW9V"
  };
  
   // 1 Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase.app().name);
  // 2 khởi tạo firebase authentication
const auth =firebase.auth();
//3. khoirw tao firestore
const db = firebase.firestore();