export interface JSONDatabaseServiceConfig {
  dbuuid: string;
  prettyFormat: boolean;
  autoSave: boolean;
  separator: string;
  syncOnSave: boolean;
}

export class Config implements JSONDatabaseServiceConfig {
  dbuuid: string;
  prettyFormat: boolean;
  autoSave: boolean;
  separator: string;
  syncOnSave: boolean;

  constructor(
    dbuuid: string,
    prettyFormat: boolean = false,
    autoSave: boolean = true,
    separator: string = ".",
    syncOnSave: boolean = false
  ) {
    this.dbuuid = dbuuid;
    this.prettyFormat = prettyFormat;
    this.autoSave = autoSave;
    this.separator = separator;
    this.syncOnSave = syncOnSave;
  }
}
