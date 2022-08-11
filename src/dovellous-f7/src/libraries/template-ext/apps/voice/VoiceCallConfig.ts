export interface VoiceCallConfig {
  database: string;
}

export class Config implements VoiceCallConfig {
  database: string;
  constructor(database: string = 'firebase') {
    this.database = database;
  }
}
