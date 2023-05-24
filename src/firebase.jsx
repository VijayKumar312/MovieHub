import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCIkLnPr7fSJlqvCtSxc6GN3v_WqzM3x4Q",
  authDomain: "clone-18ecf.firebaseapp.com",
  projectId: "clone-18ecf",
  storageBucket: "clone-18ecf.appspot.com",
  messagingSenderId: "951850012962",
  appId: "1:951850012962:web:ddcf01c6f5c36f2871d57b",
  measurementId: "G-QP85XG8WPM"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

