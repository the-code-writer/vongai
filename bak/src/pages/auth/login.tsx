import React from 'react';
import {Page, f7} from 'framework7-react';
import ImageAssets from "../../assets/js/image-assets";
import LoginWidget from '../../system/libs/dovellous-f7/src/modules/auth/widgets/login-widget';

const LoginView = () => {
    return (
        <Page noToolbar noNavbar noSwipeback loginScreen >
            <LoginWidget ImageAssets={ImageAssets} />
        </Page>
    );
}

export default LoginView;