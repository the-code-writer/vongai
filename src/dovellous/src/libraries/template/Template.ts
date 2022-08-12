import { TemplateError } from "./lib/Errors";
import { Config, TemplateConfig } from "./lib/TemplateConfig";

export class Template {
  private readonly config: TemplateConfig;

  /**
   * Template Constructor
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
