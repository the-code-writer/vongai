export interface WhiteBoardConfig {
  database: string;
}

export class Config implements WhiteBoardConfig {
  database: string;
  constructor(database: string = 'firebase') {
    this.database = database;
  }
}
