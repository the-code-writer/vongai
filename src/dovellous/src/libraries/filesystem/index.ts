import { Filesystem, Directory, Encoding } from '@capacitor/Filesystem';

// The first argument is the database filename. If no extension, '.json' is assumed and automatically added.
// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
const FileSystem = {

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
    pathExist: async (path: any, filename: any, callBack: any, createIfNotExist: boolean)=>{

        const verifyIfExists = (item, list)=> {
            let verification = false;
            for (let i = 0; i < list.length; i++) {
                if (list[i] === item) {
                    verification = true;
                    break;
                }
            }
            return verification;
        }

        try {
            
            let ret = await Filesystem.readdir({
              path: path,
              directory: Directory.Documents
            });

            if (verifyIfExists(filename, ret.files)) {

                callBack(true);
                
            }else {

                if(createIfNotExist){

                    FileSystem.mkdir(path, (res)=>{

                        callBack(res);

                        return;

                    });

                }else{

                    callBack(false);

                }

            }

          } 
          catch(e) {

            callBack(false);

          }

    },
    mkdir: async (path: any, callBack: (arg0: boolean) => void)=>{

        try {
            await Filesystem.mkdir({
              path: path,
              directory: Directory.Documents,
              recursive: true,
            });
            callBack(path);
          } 
          catch(e) {
            callBack(false);
          }
    }
}

export default FileSystem;