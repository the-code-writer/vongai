export interface LiveStreamingConfig {
  database: string;
}

export class Config implements LiveStreamingConfig {
  database: string;
  constructor(database: string = 'firebase') {
    this.database = database;
  }
}
