import {
    doSignInWithEmailAndPassword,
    doCreateUserWithEmailAndPassword,
    doSignInWithGoogle,
  } from "../firebase/auth";
  
  const AuthFactory = {
    signIn: (method, email, password) => {
      switch (method) {
        case "email":
          return doSignInWithEmailAndPassword(email, password);
        case "google":
          return doSignInWithGoogle();
        default:
          throw new Error("Invalid login method");
      }
    },
    signUp: (email, password) => {
      return doCreateUserWithEmailAndPassword(email, password);
    },
  };
  
  export default AuthFactory;
  