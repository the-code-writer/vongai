export interface VideoCallConfig {
  database: string;
}

export class Config implements VideoCallConfig {
  database: string;
  constructor(database: string = 'firebase') {
    this.database = database;
  }
}
