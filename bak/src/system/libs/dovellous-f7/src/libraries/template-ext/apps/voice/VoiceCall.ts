import { VoiceCallError } from "./VoiceCallErrors";
import { Config, VoiceCallConfig } from "./VoiceCallConfig";

export class VoiceCall {
  private readonly config: VoiceCallConfig;

  /**
   * VoiceCall Constructor
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
