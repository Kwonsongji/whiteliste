import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAn73VCUQ0y0n9z0EfoBWCEvER-i0FVDcE",
  authDomain: "whitelist-8afae.firebaseapp.com",
  projectId: "whitelist-8afae",
  storageBucket: "whitelist-8afae.appspot.com",
  messagingSenderId: "50797136306",
  appId: "1:50797136306:web:c850ba8fa138a2e8cdbcab",
  measurementId: "G-YCR1V70JB7"
};

firebase.initializeApp(firebaseConfig);
export default firebase;