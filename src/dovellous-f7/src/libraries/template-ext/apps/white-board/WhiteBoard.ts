import { WhiteBoardError } from "./WhiteBoardErrors";
import { Config, WhiteBoardConfig } from "./WhiteBoardConfig";

export class WhiteBoard {
  private readonly config: WhiteBoardConfig;

  /**
   * WhiteBoard Constructor
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
