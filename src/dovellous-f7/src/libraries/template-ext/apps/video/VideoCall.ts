import { VideoCallError } from "./VideoCallErrors";
import { Config, VideoCallConfig } from "./VideoCallConfig";

export class VideoCall {
  private readonly config: VideoCallConfig;

  /**
   * VideoCall Constructor
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
