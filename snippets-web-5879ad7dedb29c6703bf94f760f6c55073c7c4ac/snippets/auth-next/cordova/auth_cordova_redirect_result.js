// This snippet file was generated by processing the source file:
// ./auth-next/cordova.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START auth_cordova_redirect_result_modular]
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth/cordova";

const auth = getAuth();
getRedirectResult(auth)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential) {        
      // This gives you a Google Access Token.
      // You can use it to access the Google API.
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
// [END auth_cordova_redirect_result_modular]