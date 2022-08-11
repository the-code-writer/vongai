export interface InstantMessagingConfig {
  database: string;
}

export class Config implements InstantMessagingConfig {
  database: string;
  constructor(database: string = 'firebase') {
    this.database = database;
  }
}
