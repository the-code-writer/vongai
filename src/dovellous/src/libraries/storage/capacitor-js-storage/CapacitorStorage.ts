import { Storage } from "@capacitor/storage";

import { CapacitorStorageError, StorageDataError } from "./lib/Errors";
import { Config, CapacitorStorageConfig } from "./lib/CapacitorStorageConfig";

export class CapacitorStorage {
  private readonly config: CapacitorStorageConfig;

  /**
   * CapacitorStorage Constructor
   * @param prettyFormat the JSON file will be readable easily by a human
   */

  constructor(prettyFormat: boolean | Config) {
    if (prettyFormat instanceof Config) {
      this.config = prettyFormat;
    } else {
      this.config = new Config(prettyFormat);
    }
  }

  /**
   * Process datapath into different parts
   * @param key
   * @param value
   * @param callbackSuccess
   * @param callbackError
   */
  setKey(
    key: any,
    value: any,
    callbackSuccess: (arg0: string | null) => void,
    callbackError: (arg0: any) => void
  ): void {
    Storage.set({
      key: key,
      value: value,
    })
      .then((success) => {
        if (typeof callbackSuccess === "function") {
          Storage.get({ key: key })
            .then((savedValue) => {
              callbackSuccess(savedValue.value);
            })
            .catch((error) => {
              if (typeof callbackError === "function") {
                callbackError(error);
              } else {
                throw new CapacitorStorageError(
                  `Item with specified key [${key}] does not exist.`,
                  2
                );
              }
            });
        }
      })
      .catch((error) => {
        if (typeof callbackError === "function") {
          callbackError(error);
        } else {
          throw new CapacitorStorageError(
            `Item with specified key [${key}] does not exist.`,
            2
          );
        }
      });
  }

  /**
   * Process datapath into different parts
   * @param key
   * @param callbackSuccess
   * @param callbackError
   */
  getKey(
    key: any,
    callbackSuccess: (arg0: string | null) => void,
    callbackError: (arg0: any) => void
  ): void {
    Storage.get({ key: key })
      .then((savedValue) => {
        if (!savedValue) {
          throw new StorageDataError(
            `Retreived data [${savedValue.toString()}] not valid?`,
            2
          );
        } else {
          if (typeof callbackSuccess === "function") {
            callbackSuccess(savedValue.value);
          }
        }
      })
      .catch((error) => {
        if (typeof callbackError === "function") {
          callbackError(error);
        } else {
          throw new CapacitorStorageError(
            `Item with specified key [${key}] does not exist.`,
            2
          );
        }
      });
  }
}
