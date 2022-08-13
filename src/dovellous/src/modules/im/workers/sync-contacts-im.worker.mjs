import { f7 } from "framework7-react";
import phoneContactsList from "../db/contacts.json";

  // eslint-disable-next-line no-restricted-globals
  onmessage = function(e) {

    console.log(":: WORKER INIT :: data posted from main thread::", e.data);

    const contactsIndex = [];

    const contactsArray = [];

    let contactsCount = 0;

    phoneContactsList.map((contact) => {

      const initial = contact.name[0].toUpperCase();

      let isGroupTitle = false;

      if (!contactsIndex.includes(initial)) {
        isGroupTitle = true;
        contactsIndex.push(initial);
        contactsArray.push({
          data: initial,
          isGroupTitle: isGroupTitle
        });
      }

      if(!isGroupTitle){
        contactsArray.push({
          data: contact,
          isGroupTitle: isGroupTitle
        });
        contactsCount++;
      }

    });

    postMessage({contactsIndex: contactsIndex, contactsArray: contactsArray, count: contactsCount});

  }