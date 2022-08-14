// This snippet file was generated by processing the source file:
// ./database-next/read-and-write.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START rtdb_read_once_get_modular]
import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
// [END rtdb_read_once_get_modular]