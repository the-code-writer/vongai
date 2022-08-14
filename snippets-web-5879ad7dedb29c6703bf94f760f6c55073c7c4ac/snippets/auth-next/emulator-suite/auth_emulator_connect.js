// This snippet file was generated by processing the source file:
// ./auth-next/emulator-suite.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START auth_emulator_connect_modular]
import { getAuth, connectAuthEmulator } from "firebase/auth";

const auth = getAuth();
connectAuthEmulator(auth, "http://localhost:9099");
// [END auth_emulator_connect_modular]