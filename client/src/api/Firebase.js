import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDNBYPhBkPfAroOx7UEXhpQxUCUF3rBpEk",
  authDomain: "cis450project-8a703.firebaseapp.com",
  projectId: "cis450project-8a703",
  storageBucket: "cis450project-8a703.appspot.com",
  messagingSenderId: "233158587489",
  appId: "1:233158587489:web:771557cf1eca8cce34a620"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default app;