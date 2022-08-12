import { f7 } from "framework7-react";
import phoneContactsList from "../db/contacts.json";

  // eslint-disable-next-line no-restricted-globals
  onmessage = function(e) {

    console.log(":: WORKER INIT :: data posted from main thread::", e.data);

    const contactsIndex = {};

    phoneContactsList.map((contact) => {

      const initial = contact.name[0].toUpperCase();

      if (!contactsIndex.hasOwnProperty(initial)) {

        contactsIndex[initial] = [];

      }

      contactsIndex[initial].push(contact);

    });

    postMessage(contactsIndex);

  }