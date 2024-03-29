// This snippet file was generated by processing the source file:
// ./auth-next/multi-tenancy.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START multitenant_send_emaillink_modular]
import { sendSignInLinkToEmail } from "firebase/auth";
// Switch to TENANT_ID1
auth.tenantId = 'TENANT_ID1';

sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
  })
  .catch((error) => {
    // Handle / display error.
    // ...
  });
// [END multitenant_send_emaillink_modular]