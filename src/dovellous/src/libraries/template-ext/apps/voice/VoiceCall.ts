import { IMCallError } from "./IMCallErrors";
import { Config, IMCallConfig } from "./IMCallConfig";

export class IMCall {
  private readonly config: IMCallConfig;

  /**
   * IMCall Constructor
   * @param database .
   */

  constructor(database: any | Config) {
    if (database instanceof Config) {
      this.config = database;
    } else {
      this.config = new Config(database);
    }
  }

  public startCall (): {} {

    return {}

  }

}
