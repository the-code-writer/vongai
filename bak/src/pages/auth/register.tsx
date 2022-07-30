import React from 'react';
import {Page} from 'framework7-react';
import ImageAssets from "../../assets/js/image-assets";
import RegisterWidget from '../../system/libs/dovellous-f7-mobile/src/modules/auth/widgets/register-widget';

const RegisterView = () => {
    return (
        <Page noToolbar noNavbar noSwipeback loginScreen >
            <RegisterWidget ImageAssets={ImageAssets} />
        </Page>
    );
}

export default RegisterView;