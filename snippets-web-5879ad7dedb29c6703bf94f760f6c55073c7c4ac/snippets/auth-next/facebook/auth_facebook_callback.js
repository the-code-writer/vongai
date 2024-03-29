// This snippet file was generated by processing the source file:
// ./auth-next/facebook.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START auth_facebook_callback_modular]
import { getAuth, onAuthStateChanged, signInWithCredential, signOut, FacebookAuthProvider } from "firebase/auth";
const auth = getAuth();

function checkLoginState(response) {
  if (response.authResponse) {
    // User is signed-in Facebook.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(response.authResponse, firebaseUser)) {
        // Build Firebase credential with the Facebook auth token.
        const credential = FacebookAuthProvider.credential(
            response.authResponse.accessToken);

        // Sign in with the credential from the Facebook user.
        signInWithCredential(auth, credential)
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            // ...
          });
      } else {
        // User is already signed-in Firebase with the correct user.
      }
    });
  } else {
    // User is signed-out of Facebook.
    signOut(auth);
  }
}
// [END auth_facebook_callback_modular]