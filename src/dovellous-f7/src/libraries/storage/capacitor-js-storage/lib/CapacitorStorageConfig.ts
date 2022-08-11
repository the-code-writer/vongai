export interface CapacitorStorageConfig {
  prettyFormat: boolean;
}

export class Config implements CapacitorStorageConfig {
  prettyFormat: boolean;
  constructor(prettyFormat: boolean = false) {
    this.prettyFormat = prettyFormat;
  }
}
