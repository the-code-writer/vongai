export interface TemplateConfig {
  database: string;
}

export class Config implements TemplateConfig {
  database: string;
  constructor(database: string = 'firebase') {
    this.database = database;
  }
}
