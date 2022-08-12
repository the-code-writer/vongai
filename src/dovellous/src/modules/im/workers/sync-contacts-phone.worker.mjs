import { Contacts } from "@capacitor-community/contacts";

// eslint-disable-next-line no-restricted-globals
onmessage = function (e) {
  console.log(":: CONTACTS WORKER INIT :: data posted from main thread::", e.data);
  Contacts.getContacts().then((result) => {
    const contactsIndex = {};
    for (const contact of result.contacts) {
      console.log(":: CONTACTS INIT::", contact);
      const initial = contact.name[0].toUpperCase();
      if (!contactsIndex.hasOwnProperty(initial)) {
        contactsIndex[initial] = [];
      }
      contactsIndex[initial].push(contact);
    }
    console.log(":: CONTACTS WORKER INIT :: data posted from main thread::", e.data);
    postMessage(contactsIndex);
  });
};
