// Import Framework7
// @ts-ignore
import Framework7 from 'framework7/lite-bundle';

const NetworkRequest = {

    call: (url: any, data: any, callbackSuccess: any, callbackError: any, method: any, dataType: any, options: object ) => {

        if(typeof options === "object"){

            // After the following setup all XHR requests will have additional 'Autorization' header
            Framework7.request.setup(options);

        }
        
        Framework7.request[method](url, data, callbackSuccess, callbackError, dataType);

    },

    get: (url: any, callbackSuccess: (arg0: string) => void // @ts-ignore
, callbackError: (arg0: { status?: string | undefined; code?: number | undefined; message?: string | undefined; response?: { messages: { json: string; }; } | undefined; data?: string | undefined; raw?: null | undefined; }) => void) => {

        const payload = { 
            timeout: 20000,
            data: null,
            returnDataType: 'string',
            authorization: null,
            clientID: null,
            clientSecret: null,
        };

        NetworkRequest.ajax(url, "get", payload, callbackSuccess, callbackError)

    },

    post: (url: any, callbackSuccess: (arg0: string) => void // @ts-ignore
, callbackError: (arg0: { status?: string | undefined; code?: number | undefined; message?: string | undefined; response?: { messages: { json: string; }; } | undefined; data?: string | undefined; raw?: null | undefined; }) => void) => {

        const payload = { 
            timeout: 20000,
            data: null,
            returnDataType: 'string',
            authorization: null,
            clientID: null,
            clientSecret: null,
        };

        NetworkRequest.ajax(url, "post", payload, callbackSuccess, callbackError);

    },

    ajax: (url: any, method: any, payload: { timeout: any; data: any; returnDataType: string; hasOwnProperty: (arg0: string) => any; authorization: any; clientID: string; clientSecret: string; }, callbackSuccess: (arg0: string) => void, callbackError: (arg0: { status?: string; code?: number; message?: string; response?: { messages: { json: string; }; }; data?: string; raw?: null; }) => void) => {

        let options = {
            "url": url,
            "method": method,
            "timeout": payload.timeout,
            "data": payload.data,
            dataType: payload.returnDataType,
            crossDomain: true,
            beforeSend: function (xhr: any) {
                //
            },
            statusCode: {
                200: function (xhr) {
                  console.error('200 :: ok');
                },
                201: function (xhr) {
                  console.error('201 :: resource created');
                },
                401: function (xhr) {
                  console.error('401 :: unauthorized');
                },
                403: function (xhr) {
                  console.error('403 :: forbidden');
                },
                404: function (xhr) {
                  console.error('404 :: page not found');
                },
                500: function (xhr) {
                  console.error('500 :: server error');
                },
            }
        };

        if(payload.hasOwnProperty("authorization") && payload.authorization !== null){
            options["headers"] = {
                "Authorization": payload.hasOwnProperty("clientID") ? ("Basic " + btoa(payload.clientID + ":" + payload.clientSecret)) : payload.authorization,
            };
        }

        Framework7.request(options)
            .then(function (res: { hasOwnProperty: (arg0: string) => any; data: string | null; }) {

                if(res.hasOwnProperty('data')){

                    if(res.data !== null){

                        try{

                            let serverResponse = res.data;

                            if(payload.returnDataType==="text"){
                                
                                serverResponse = JSON.parse(res.data);

                            }
                            
                            callbackSuccess(serverResponse);

                        } catch (error){

                            const errorObject = {status: "error", code: 400, message: 'Error parsing server response message', response: {messages: {json: 'Error parsing server response message'}}, data: res.data, raw: null};

                            callbackError(errorObject);

                        }

                    }

                }

            })
            .catch((error: { xhr: { responseText: string; status: any; statusText: any; }; }): void => {

                let responseText = error.xhr.responseText;

                let errorObject = {};

                try {

                    responseText = JSON.parse(error.xhr.responseText);

                } catch (e) {

                    //

                } finally {

                    errorObject = { status: "error", code: error.xhr.status, message: error.xhr.statusText, response: responseText, raw: error.xhr };

                }

                callbackError(errorObject);

            }
        );

    },

    api: {

        oauth: {

            registerDevice: () => {

                //

            },
            registerUser: () => {

                //

            },
            loginUser: () => {

                //

            },

        },

        get: () => {

            //

        },

        post: () => {

            //

        },

        put: () => {

            //

        },

        update: () => {

            //

        },

        delete: () => {

            //

        },

    }

}

export default NetworkRequest;