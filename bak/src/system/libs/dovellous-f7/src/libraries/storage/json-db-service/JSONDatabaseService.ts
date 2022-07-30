import {CapacitorStorage} from "../capacitor-js-storage/CapacitorStorage";
import { KeyValue, merge, removeTrailingChar } from "./lib/Utils";
import { DatabaseError, DataError } from "./lib/Errors";
import { DBParentData } from "./lib/DBParentData";
import { ArrayInfo } from "./lib/ArrayInfo";
import { Config, JSONDatabaseServiceConfig } from "./lib/JSONDatabaseServiceConfig";

type DataPath = Array<string>;

export type FindCallback = (entry: any, index: number | string) => boolean;

export class JSONDatabaseService {
  private loaded: boolean = false;
  private data: KeyValue = {};
  private readonly config: JSONDatabaseServiceConfig;
  private capacitorStorage = new CapacitorStorage(true);

  /**
   * JSONDatabaseService Constructor
   * @param dbuuid where to save the "DB". Can also be used to give the whole configuration
   * @param autoSave save the database at each push command into the json file
   * @param prettyFormat the JSON file will be readable easily by a human
   * @param separator what to use as separator
   * @param syncOnSave force sync of the database (call fsync())
   */

  constructor(
    dbuuid: string | Config,
    autoSave: boolean = true,
    prettyFormat: boolean = false,
    separator: string = "/",
    syncOnSave: boolean = false
  ) {
    if (dbuuid instanceof Config) {
      this.config = dbuuid;
    } else {
      this.config = new Config(
        dbuuid,
        autoSave,
        prettyFormat,
        separator,
        syncOnSave
      );
    }

    this.load(
      (data) => {
        this.loaded = true;
      },
      (error) => {
        console.warn(error);
      }
    );
  }

  /**
   * Process datapath into different parts
   * @param dataPath
   */
  private processDataPath(dataPath: string): DataPath {
    if (dataPath === undefined || !dataPath.trim()) {
      throw new DataError("The Data Path can't be empty", 6);
    }
    if (dataPath == this.config.separator) {
      return [];
    }

    dataPath = removeTrailingChar(dataPath, this.config.separator);

    if (dataPath.length > 1 && dataPath.endsWith(this.config.separator)) {
      dataPath = dataPath.substring(0, dataPath.length - 1);
    }

    const path = dataPath.split(this.config.separator);

    path.shift();

    return path;
  }

  private retrieveData(dataPath: DataPath, create: boolean = false) {
    this.load(null, null);

    const thisDb = this;

    const recursiveProcessDataPath = (data: any, index: number): any => {
      let property = dataPath[index];

      /**
       * Find the wanted Data or create it.
       */
      function findData(isArray: boolean = false) {
        if (data.hasOwnProperty(property)) {
          data = data[property];
        } else if (create) {
          if (isArray) {
            data[property] = [];
          } else {
            data[property] = {};
          }
          data = data[property];
        } else {
          throw new DataError(
            `Can't find dataPath: ${thisDb.config.separator}${dataPath.join(
              thisDb.config.separator
            )}. Stopped at ${property}`,
            5
          );
        }
      }

      const arrayInfo = ArrayInfo.processArray(property);
      if (arrayInfo) {
        property = arrayInfo.property;
        findData(true);
        if (!Array.isArray(data)) {
          throw new DataError(
            `DataPath: ${thisDb.config.separator}${dataPath.join(
              thisDb.config.separator
            )}. ${property} is not an array.`,
            11
          );
        }
        const arrayIndex = arrayInfo.getIndex(data, true);
        if (!arrayInfo.append && data.hasOwnProperty(arrayIndex)) {
          data = arrayInfo.getData(data);
        } else if (create) {
          if (arrayInfo.append) {
            data.push({});
            data = data[data.length - 1];
          } else {
            data[arrayIndex] = {};
            data = data[arrayIndex];
          }
        } else {
          throw new DataError(
            `DataPath: ${thisDb.config.separator}${dataPath.join(
              thisDb.config.separator
            )}. . Can't find index ${arrayInfo.index} in array ${property}`,
            10
          );
        }
      } else {
        findData();
      }

      if (dataPath.length == ++index) {
        // check data
        return data;
      }
      return recursiveProcessDataPath(data, index);
    };

    if (dataPath.length === 0) {
      return this.data;
    }

    return recursiveProcessDataPath(this.data, 0);
  }

  private getParentData(dataPath: string, create: boolean): DBParentData {
    const path = this.processDataPath(dataPath);
    const last = path.pop();
    return new DBParentData(
      this.retrieveData(path, create),
      this,
      dataPath,
      last
    );
  }

  /**
   * Get the wanted data
   * @param dataPath path of the data to retrieve
   */
  public getData(dataPath: string): any {
    const path = this.processDataPath(dataPath);
    return this.retrieveData(path, false);
  }

  /**
   * Same as getData only here it's directly typed to your object
   * @param dataPath  path of the data to retrieve
   */
  public getObject<T>(dataPath: string): T {
    return this.getData(dataPath);
  }

  /**
   * Check for existing datapath
   * @param dataPath
   */
  public exists(dataPath: string): boolean {
    try {
      this.getData(dataPath);
      return true;
    } catch (e) {
      if (e instanceof DataError) {
        return false;
      }
      throw e;
    }
  }

  /**
   * Returns the index of the object that meets the criteria submitted. Returns -1, if no match is found.
   * @param dataPath  base dataPath from where to start searching
   * @param searchValue value to look for in the dataPath
   * @param propertyName name of the property to look for searchValue
   */
  public getIndex(
    dataPath: string,
    searchValue: string | number,
    propertyName: string = "id"
  ): number {
    const data = this.getArrayData(dataPath);
    return data
      .map(function (element: any) {
        return element[propertyName];
      })
      .indexOf(searchValue);
  }

  /**
   * Return the index of the value inside the array. Returns -1, if no match is found.
   * @param dataPath  base dataPath from where to start searching
   * @param searchValue value to look for in the dataPath
   */
  public getIndexValue(dataPath: string, searchValue: string | number): number {
    return this.getArrayData(dataPath).indexOf(searchValue);
  }

  private getArrayData(dataPath: string) {
    const result = this.getData(dataPath);
    if (!Array.isArray(result)) {
      throw new DataError(`DataPath: ${dataPath} is not an array.`, 11);
    }
    const path = this.processDataPath(dataPath);
    return this.retrieveData(path, false);
  }

  /**
   * Pushing data into the database
   * @param dataPath path leading to the data
   * @param data data to push
   * @param override overriding or not the data, if not, it will merge them
   */
  public push(dataPath: string, data: any, override: boolean = true): void {
    const dbData = this.getParentData(dataPath, true);
    // if (!dbData) {
    //   throw new Error('Data not found')
    // }

    let toSet = data;
    if (!override) {
      if (Array.isArray(data)) {
        let storedData = dbData.getData();
        if (storedData === undefined) {
          storedData = [];
        } else if (!Array.isArray(storedData)) {
          throw new DataError(
            "Can't merge another type of data with an Array",
            3
          );
        }
        toSet = storedData.concat(data);
      } else if (data === Object(data)) {
        if (Array.isArray(dbData.getData())) {
          throw new DataError("Can't merge an Array with an Object", 4);
        }
        toSet = merge(dbData.getData(), data);
      }
    }
    dbData.setData(toSet);

    this.autoSaveData();
  }

  /**
   * Delete the data
   * @param dataPath path leading to the data
   */
  public del(dataPath: string): void {
    const dbData = this.getParentData(dataPath, true);
    if (!dbData) {
      return;
    }
    dbData.delete();

    this.autoSaveData();
  }

  /**
   * Only use this if you know what you're doing.
   * It reset the full data of the database.
   */
  public autoSaveData(): void {
    if (this.config.autoSave) {
      this.save(null, null);
    }
  }

  /**
   * Only use this if you know what you're doing.
   * It reset the full data of the database.
   * @param data
   */
  public resetData(data: any): void {
    this.data = data;
  }

  /**
   * Reload the database from the file
   */
  public reload(): void {
    this.loaded = false;
    this.load(
      (data) => {
        this.loaded = true;
      },
      (error) => {
        console.warn(error);
      }
    );
  }

  /**
   * Manually load the database
   * It is automatically called when the first getData is done
   */
  public load(
    callbackFunctionSuccess: ((arg0: any) => void) | null,
    callbackFunctionError: ((arg0: any) => void) | null
  ): void {
    if (this.loaded) {
      return;
    }
    try {
      this.capacitorStorage.getKey(
        this.config.dbuuid,
        (data) => {
          this.data = data;
          if (
            callbackFunctionSuccess !== null &&
            (typeof callbackFunctionSuccess).toString().toLowerCase() ===
            "function"
          ) {
            callbackFunctionSuccess(data);
          } else {
            this.loaded = true;
            return data;
          }
        },
        (error: any): void => {
          if (
            callbackFunctionError !== null &&
            (typeof callbackFunctionError).toString().toLowerCase() ===
            "function"
          ) {
            callbackFunctionError(error);
          } else {
            this.loaded = false;
            return;
          }
        }
      );
    } catch (error) {
      if (
        callbackFunctionError !== null &&
        (typeof callbackFunctionError).toString().toLowerCase() === "function"
      ) {
        callbackFunctionError(error);
      } else {
        const err = new DatabaseError("Can't Load Database", 1, error);
        throw err;
      }
    }
  }

  /**
   * Manually save the database
   * By default you can't save the database if it's not loaded
   * @param force force the save of the database
   */
  public save(
    callbackFunctionSuccess: ((arg0: any) => void) | null,
    callbackFunctionError: ((arg0: any) => void) | null,
    force?: boolean
  ) {
    force = force || false;
    if (!force && !this.loaded) {
      throw new DatabaseError("DataBase not loaded. Can't write", 7);
    }
    let data = "";
    if (this.config.prettyFormat) {
      data = JSON.stringify(this.data, null, 4);
    } else {
      data = JSON.stringify(this.data);
    }

    try {
      this.capacitorStorage.setKey(
        this.config.dbuuid,
        data,
        (data: any) => {
          if (
            callbackFunctionSuccess !== null &&
            (typeof callbackFunctionSuccess).toString().toLowerCase() ===
            "function"
          ) {
            callbackFunctionSuccess(data);
          } else {
            return;
          }
        },
        (error: any) => {
          if (
            callbackFunctionError !== null &&
            (typeof callbackFunctionError).toString().toLowerCase() ===
            "function"
          ) {
            callbackFunctionError(error);
          } else {
            return;
          }
        }
      );
    } catch (error) {
      if (
        callbackFunctionError !== null &&
        (typeof callbackFunctionError).toString().toLowerCase() === "function"
      ) {
        callbackFunctionError(error);
      } else {
        const err = new DatabaseError("Can't Write Database", 1, error);
        throw err;
      }
    }
  }

  public pullData(
    path: string,
    callbackFunctionSuccess: (arg0: any) => void,
    callbackFunctionError: (arg0: any) => void
  ): KeyValue | undefined {
    try {
      let pathKeys = path.split(this.config.separator);
      let extractedObject = pathKeys.reduce((a, c) => a[c], this.data);
      if (
        (typeof callbackFunctionSuccess).toString().toLowerCase() === "function"
      ) {
        callbackFunctionSuccess(extractedObject);
      } else {
        return extractedObject;
      }
    } catch (error) {
      if (
        (typeof callbackFunctionError).toString().toLowerCase() === "function"
      ) {
        callbackFunctionError(error);
      } else {
        return;
      }
    }
  }
  public pushData(
    path: string,
    data: string,
    callbackFunctionSuccess: (arg0: KeyValue) => void,
    callbackFunctionError: (arg0: any) => void
  ): KeyValue | undefined {
    try {
      this.updateJsonObject(path, data, this.data);
      this.config.autoSave ? this.autoSaveData() : null;
      if (
        (typeof callbackFunctionSuccess).toString().toLowerCase() === "function"
      ) {
        callbackFunctionSuccess(this.data);
      } else {
        return this.data;
      }
    } catch (error) {
      if (
        (typeof callbackFunctionError).toString().toLowerCase() === "function"
      ) {
        callbackFunctionError(error);
      } else {
        return;
      }
    }
  }
  public addDataAfterId(
    afterId: any,
    data: any,
    callbackFunctionSuccess: any,
    callbackFunctionError: any
  ): KeyValue | undefined {

    try {
      this.data = this.addNewObject(this.data, afterId, data);
      if (
        (typeof callbackFunctionSuccess).toString().toLowerCase() === "function"
      ) {
        callbackFunctionSuccess(this.data);
      } else {
        return this.data;
      }
    } catch (error) {
      if (
        (typeof callbackFunctionError).toString().toLowerCase() === "function"
      ) {
        callbackFunctionError(error);
      } else {
        return;
      }
    }
  }
  public addNewObject(
    mainContainer: KeyValue,
    idTobeMatched: any,
    newObject: any
  ): KeyValue {
    for (let i = 0; i < mainContainer.length; i++) {
      if (mainContainer[i].id == idTobeMatched) {
        let indexOfNewObject = i + 1;
        mainContainer.splice(indexOfNewObject, 0, newObject);
        return mainContainer;
      } else if (mainContainer[i].data && mainContainer[i].data.length) {
        mainContainer[i].data = this.addNewObject(
          mainContainer[i].data,
          idTobeMatched,
          newObject
        );
      }
    }
    return mainContainer;
  }
  public constructObject(path: string, data: any): {} {
    const res = {};
    let ref = res;
    let pathArr = path.split(this.config.separator.toString());
    let counter = 0;
    while (counter < pathArr.length) {
      let segmentData = ref[pathArr[counter]];
      ref[pathArr[counter]] = segmentData ? segmentData : {};
      counter === pathArr.length - 1 ? (ref[pathArr[counter]] = data) : null;
      ref = ref[pathArr[counter]];
      counter++;
    }
    return res;
  }
  public updateJsonObject(path: string, value: string, obj: KeyValue): void {
    var objValue = value;
    try {
      objValue = JSON.parse(value);
    } catch (e) { }

    var parts = path.split("."),
      part: string | number | undefined;
    var last = parts.pop();
    while ((part = parts.shift())) {
      if (typeof obj[part] != "object") obj[part] = {};
      obj = obj[part];
    }
    if (
      obj.hasOwnProperty(last) &&
      obj[last] &&
      obj[last].constructor === Array
    ) {
      obj[last].push(objValue);
    } else if (obj.hasOwnProperty(last) && obj[last]) {
      var objArray = [];
      objArray.push(obj[last]);
      objArray.push(objValue);
      obj[last] = objArray;
    } else {
      obj[last] = objValue;
    }
  }
}
