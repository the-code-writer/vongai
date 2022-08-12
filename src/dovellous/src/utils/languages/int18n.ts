//import * as Dovellous from '../../../dovellous-f7-mobile';

import { f7 } from 'framework7-react';

const INT18N = {

    text: (path: any, language: string): string => {

        if(!language){
            language = "en";
        }

        console.log("::: f7.dovellous ::: params :::", f7.params.dovellous);
        console.log("::: f7.dovellous :::", f7.dovellous.libs);

        const JSONDB = new f7.dovellous.libs.jsonDatabaseService;

        const languagesDataResource = new JSONDB("languagesDataResource");

        return languagesDataResource.pullData(`/${language}/${path}`);

    },

};

export default INT18N;