export interface IMCallConfig {
  database: string;
}

export class Config implements IMCallConfig {
  database: string;
  constructor(database: string = 'firebase') {
    this.database = database;
  }
}
