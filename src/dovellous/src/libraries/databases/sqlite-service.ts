// PLUGIN IMPORTS
import "@capacitor-community/sqlite";

import { SQLiteConnection } from "@capacitor-community/sqlite";
import { CapacitorSQLite } from '@capacitor-community/sqlite';

window.SQLiteConnection = SQLiteConnection;

window.CapacitorSQLite = CapacitorSQLite;


const SqliteService = {

    database : null,
    files : null,
    databaseInitialized : false,
    // INIT DATABASE

    initDbTable : async () => {
        const CREATE_TABLE =
            "CREATE TABLE IF NOT EXISTS files (" +
            "id INTEGER PRIMARY KEY NOT NULL," +
            "filename TEXT NOT NULL," +
            "filepath TEXT NOT NULL," +
            "filedate TEXT NOT NULL);";
        const resp = await SqliteService.database?.query(CREATE_TABLE);

        if (resp.message) {
            throw new Error(resp?.message);
        }

        return true;
    },

    addFile : async (filename, filepath, filedate) => {
        const resp = await SqliteService.database?.run(
            "INSERT INTO files (filename, filepath, filedate) " +
            "VALUES(?, ?, ?);",
            [filename, filepath, filedate]
        );
        if (resp.message) {
            throw new Error(resp?.message);
        }

        return true;
    },

    loadFileData : async () => {
        try {
            const resp = await SqliteService.database?.query(
                "SELECT * FROM files;"
            );
            sqliteService.files = resp.values;
            console.log(":: LOADED FILES ::", SqliteService.files);
            return true;
        } catch (e) {
            console.warn("Error Loading files");
        }
    },

    /**
     *
     * @param fileId
     */
    deleteFileById : async (fileId) => {
        const response = await SqliteService.database?.run(
            "DELETE FROM files WHERE id=?",
            [fileId + ""]
        );
        await SqliteService.loadFileData();
        return response;
    },

    /**
     *
     */
    getFileById : async (fileId) => {
        const result = await SqliteService.database?.query(
            "SELECT * FROM files WHERE id = ?;",
            [fileId]
        );
        return result.values[0];
    },

    /**
     *
     * @param filename
     * @param filepath
     * @param filedate
     */
    createFile : async (
        filename,
        filepath,
        filedate
    ) => {
        const resp = await SqliteService.database?.query(
            "INSERT INTO files (filename, filepath, filedate) " + "VALUES(?,?,?)",
            [filename, filepath, filedate]
        );
        await SqliteService.loadFileData();
        return resp;
    },

    /**
     *
     * @param filename
     * @param filepath
     * @param filedate
     * @param fileId
     */
    updateFile : async (
        filename,
        filepath,
        filedate,
        fileId
    ) => {
        const resp = await SqliteService.database?.query(
            "UPDATE files SET filename=?, filepath=?, filedate=? " + "WHERE id=?",
            [filename, filepath, filedate, fileId]
        );

        await SqliteService.loadFileData();
        return resp;
    },
    /**
     * Create the database in the application
     */
    databaseStartup : async () => {

        const sqlite = new SQLiteConnection(CapacitorSQLite);

        sqlite.createConnection(
            "ionic-vue-db1",
            false,
            "no-encryption",
            1
        )
            .then(function (db){

                console.log(":: databaseStartup :S:", db);

                if (!db) {

                    console.log(":: databaseStartup :E: No such database", db);

                }

                db.open().then(function (db){

                    console.log("::db.open()::", db);

                    SqliteService.database= db;

                    SqliteService.initDbTable().then(function (){

                        SqliteService.databaseInitialized = true;

                        SqliteService.loadFileData().then(function (data){

                            console.log(":: loadFileData :RES:", data);

                        });

                    })

                });


            })
            .catch(function (err){
                console.log(":: databaseStartup :E1:", err);

                //return;

            });

    }

};

export default SqliteService;