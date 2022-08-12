import { InstantMessagingError } from "./InstantMessagingErrors";
import { Config, InstantMessagingConfig } from "./InstantMessagingConfig";

export class InstantMessaging {
  private readonly config: InstantMessagingConfig;

  /**
   * InstantMessaging Constructor
   * @param database .
   */

  constructor(database: any | Config) {
    if (database instanceof Config) {
      this.config = database;
    } else {
      this.config = new Config(database);
    }
  }

}
