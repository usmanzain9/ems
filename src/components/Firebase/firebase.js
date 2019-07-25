import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyD5QtpeUULHa5N6DE_t6cS3yJKOW7cCfYo",
  authDomain: "emsys-e1b71.firebaseapp.com",
  databaseURL: "https://emsys-e1b71.firebaseio.com",
  projectId: "emsys-e1b71",
  storageBucket: "",
  messagingSenderId: "1035876631772",
  appId: "1:1035876631772:web:fe0f1b4b8c20ec51"
};

class Firebase {
  constructor(props) {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  //   *** Auth API ***
  doSignIn = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignOut = () => {
    return this.auth.signOut();
  };

  doPasswordReset = email => {
    return this.auth.sendPasswordResetEmail(email);
  };

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  //   ***  User API ***
  addUser = () => this.db.collection("employees");

  readUser = () => this.db.collection("employees").get();
}

export default Firebase;
