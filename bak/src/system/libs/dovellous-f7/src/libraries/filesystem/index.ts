import { Filesystem, Directory, Encoding } from '@capacitor/Filesystem';

// The first argument is the database filename. If no extension, '.json' is assumed and automatically added.
// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
const FileSystem = {

    platform: "web",

    init: (platform: any = "web") => {

        FileSystem.platform = platform;

    },
    read: (path, callbackFunctionSuccess, callbackFunctionError) => {
        if(FileSystem.platform==="web"){
            return FileSystem.readFileWeb(path, callbackFunctionSuccess, callbackFunctionError);
        }
        return FileSystem.readFile(path, callbackFunctionSuccess, callbackFunctionError);
    },
    readFile: async (path, callbackFunctionSuccess, callbackFunctionError) => {
        try{
            const fileObject = {
                path: path,
                directory: Directory.Documents,
                encoding: Encoding.UTF8,
            };
            const data = await Filesystem.readFile(fileObject);
            if((typeof callbackFunctionSuccess).toString().toLowerCase() === "function"){
                callbackFunctionSuccess(data);
            }else{
                return data;
            }
        }catch(error){
            if((typeof callbackFunctionError).toString().toLowerCase() === "function"){
                callbackFunctionError(error);
            }else{
                return;
            }
        }
    },
    readFileWeb: async (path, callbackFunctionSuccess, callbackFunctionError) => {
        try{
            const fileObject = {
                path: path,
                directory: Directory.Documents,
                encoding: Encoding.UTF8,
            };
            const data = await Filesystem.readFile(fileObject);
            if((typeof callbackFunctionSuccess).toString().toLowerCase() === "function"){
                callbackFunctionSuccess(data);
            }else{
                return data;
            }
        }catch(error){
            if((typeof callbackFunctionError).toString().toLowerCase() === "function"){
                callbackFunctionError(error);
            }else{
                return;
            }
        }
    },
    save: (path, data, callbackFunctionSuccess, callbackFunctionError) => {
        if(FileSystem.platform==="web"){
            return FileSystem.saveFileWeb(path, data, callbackFunctionSuccess, callbackFunctionError);
        }
        return FileSystem.saveFile(path, data, callbackFunctionSuccess, callbackFunctionError);
    }, 
    saveFile: async (path, data, callbackFunctionSuccess, callbackFunctionError) => {
        try{
            const fileObject = {
                path: path,
                data: data,
                directory: Directory.Documents,
                encoding: Encoding.UTF8,
            };
            await Filesystem.writeFile(fileObject);
            if((typeof callbackFunctionSuccess).toString().toLowerCase() === "function"){
                callbackFunctionSuccess(fileObject);
            }
        }catch(error){
            if((typeof callbackFunctionError).toString().toLowerCase() === "function"){
                callbackFunctionError(error);
            }
        }
    }, 
    saveFileWeb: async (path, data, callbackFunctionSuccess, callbackFunctionError) => {
        try{
            const fileObject = {
                path: path,
                data: data,
                directory: Directory.Documents,
                encoding: Encoding.UTF8,
            };
            await Filesystem.writeFile(fileObject);
            if((typeof callbackFunctionSuccess).toString().toLowerCase() === "function"){
                callbackFunctionSuccess(fileObject);
            }
        }catch(error){
            if((typeof callbackFunctionError).toString().toLowerCase() === "function"){
                callbackFunctionError(error);
            }
        }
    }, 
    del: (path, callbackFunctionSuccess, callbackFunctionError) => {
        if(FileSystem.platform==="web"){
            return FileSystem.deleteFileWeb(path, callbackFunctionSuccess, callbackFunctionError);
        }
        return FileSystem.deleteFile(path, callbackFunctionSuccess, callbackFunctionError);
    }, 
    deleteFile: async (path, callbackFunctionSuccess, callbackFunctionError) => {
        try{
            const fileObject = {
                path: path,
                directory: Directory.Documents,
            };
            await Filesystem.deleteFile(fileObject);
            if((typeof callbackFunctionSuccess).toString().toLowerCase() === "function"){
                callbackFunctionSuccess(fileObject);
            }
        }catch(error){
            if((typeof callbackFunctionError).toString().toLowerCase() === "function"){
                callbackFunctionError(error);
            }
        }
    }, 
    deleteFileWeb: async (path, callbackFunctionSuccess, callbackFunctionError) => {
        try{
            const fileObject = {
                path: path,
                directory: Directory.Documents,
            };
            await Filesystem.deleteFile(fileObject);
            if((typeof callbackFunctionSuccess).toString().toLowerCase() === "function"){
                callbackFunctionSuccess(fileObject);
            }
        }catch(error){
            if((typeof callbackFunctionError).toString().toLowerCase() === "function"){
                callbackFunctionError(error);
            }
        }
    }
}

export default FileSystem;