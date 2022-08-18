import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';

const Encryption = {

    md5: (str: any) => {
        //console.log("::HASH::", str)
        const hash = CryptoJS.MD5(str.toString());
        const hashed = CryptoJS.enc.Hex.stringify(hash);
        //console.log("::HASHED::", hashed)
        return hashed;

    },
    sha1: (deviceString: any) => {

        const hash = CryptoJS.SHA1(deviceString.toString());

        return CryptoJS.enc.Hex.stringify(hash);

    },
    sha128: (deviceString: any) => {

        const hash = CryptoJS.SHA128(deviceString.toString());

        return CryptoJS.enc.Hex.stringify(hash);

    },
    sha256: (deviceString: any) => {

        const hash = CryptoJS.SHA256(deviceString.toString());

        return CryptoJS.enc.Hex.stringify(hash);

    },
    sha512: (deviceString: any) => {

        const hash = CryptoJS.SHA512(deviceString.toString());

        return CryptoJS.enc.Hex.stringify(hash);

    },
    encrypt: async (callbackSuccess: (arg0: any) => void, callbackError: any, publicKey: any, text: any) => {

        const jSEncrypt = new JSEncrypt();

        jSEncrypt.setPublicKey(publicKey);

        if (typeof callbackSuccess === "function") {

            callbackSuccess(jSEncrypt.encrypt(text));

        }

    },
    decrypt: async (callbackSuccess: (arg0: any) => void, callbackError: any, privateKey: any, encrypted: any) => {

        const jSEncrypt = new JSEncrypt();

        jSEncrypt.setPrivateKey(privateKey);

        if (typeof callbackSuccess === "function") {

            callbackSuccess(jSEncrypt.decrypt(encrypted));

        }

    },
    generateKeyPair: async (callbackSuccess: (arg0: { publicKey: any; privateKey: any; }) => void, callbackError: (arg0: any) => void, default_key_size: number) => {

        //console.log(":: PREPARE TO GENERATE ENCRYPTION KEYS :0:");

        const jSEncrypt = new JSEncrypt({default_key_size: default_key_size});

        //console.log(":: PREPARE TO OBJ :1:", jSEncrypt);

        if (default_key_size % 1024 === 0) {

            //console.log(":: PREPARE TO OBJ :2:", jSEncrypt);

            const publicKey = jSEncrypt.getPublicKey();

            //console.log(":: ENCRYPTION OBJ CREATED :4:publicKey", publicKey);

            const privateKey = jSEncrypt.getPrivateKey();

            //console.log(":: ENCRYPTION OBJ CREATED :5:privateKey", privateKey);

            callbackSuccess({
                publicKey: publicKey,
                privateKey: privateKey
            });

        } else {

            console.log(":: ENCRYPTION OBJ ERROR :4:", jSEncrypt);

            callbackError(jSEncrypt);

        }

    },

    base64: {

        

    },

}

export default Encryption;