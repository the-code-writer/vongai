import { LiveStreamingError } from "./LiveStreamingErrors";
import { Config, LiveStreamingConfig } from "./LiveStreamingConfig";

export class LiveStreaming {
  private readonly config: LiveStreamingConfig;

  /**
   * LiveStreaming Constructor
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
