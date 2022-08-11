import React, { useState, useRef } from 'react';
import {
    f7, useStore,
    List, ListInput, ListButton,
    BlockFooter, Block,
    LoginScreenTitle,
    Checkbox, Button,
    Row, Col
} from 'framework7-react';

import Dom7 from "dom7";

import INT18N from '../../../utils/languages/int18n';
import Konstants from '../../../libraries/app/konstants';

const LoginWidget = ( {ImageAssets} ) => {

    const defaultLanguage = useStore('defaultLanguage');

    const appData = useStore('getApp');
    const authLoginIsLoading = useStore('authLoginIsLoading');
    const authLoginWithPIN = useStore('authLoginWithPIN');
    const authLoginPINLength = useStore('authLoginPINLength');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userEnteredPIN, setUserEnteredPIN] = useState([]);
    const [rememberMe, setRememberMe] = useState({ value: 'RememberMe', checked: false });
    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    const pinModalMiniKeypadWrapperSheetModal = useRef(null);

    const pinModalMiniKeypad = useRef(null);

    const onRememberMe = (e: { target: { value: any; checked: any; }; }): void => {
        setRememberMe(
            {
                value: e.target.value,
                checked: e.target.checked
            }
        );
        console.log("REMEMBER ME", {
            value: e.target.value,
            checked: e.target.checked
        });
    };

    const signInSocial = () => {
        f7.sheet.open(".sheet-swipe-to-close-sign-in-with-social");
    }

    const signInViaSocialAccount = (item: any) => {
        console.log("SIGN IN VIA SOCIAL ACCOUNT", item);
    }

    const signIn = (pin: string | any[]) => {

        if (authLoginIsLoading) {
            return;
        }

        if (username === "") {
            signInError({
                message: INT18N.text(`ajax/auth/username_missing`, defaultLanguage),
                shakeEl: "username"
            }, false);
            return;
        }

        if (typeof pin === "object") {
            pin = Dom7('#numpad-mini-input').val();
        }

        if (typeof pin === "undefined") {
            signInError({
                message: INT18N.text(`ajax/auth/pin_missing`, defaultLanguage),
                shakeEl: "pin"
            }, false);
            createPINModalMiniKeypadSheet();
            return;
        }

        const password = pin.toString();

        if (password.length < 4) {
            const pinMessage = password.length === 0 ? INT18N.text(`ajax/auth/pin_empty`, defaultLanguage) : INT18N.text(`ajax/auth/pin_incomplete`, defaultLanguage);
            signInError({
                message: pinMessage,
                shakeEl: "pin"
            }, false);
            createPINModalMiniKeypadSheet();
            return;
        }

        f7.store.dispatch(
            "authLoginUser",
            {
                params: {
                    username: username,
                    password: password,
                    rememberMe: rememberMe
                },
                callbackMethods: {
                    success: (res: { data: string; }) => {

                        const result = JSON.parse(res.data);

                        if (result.status.toString().toUpperCase() === "OK") {

                            if ("user" in result) {

                                // @ts-ignore
                                if (pinModalMini.current !== null) {
                                    // @ts-ignore
                                    pinModalMini.current.setValue('');
                                }

                                setUserEnteredPIN([]);

                                Dom7('.error-message').hide();

                                f7.sheet.close('#numpad-mini-sheet-modal');

                                f7.emit(`${Konstants.Events.Auth.LOGIN_SUCCESS}`, result.user);

                            } else {

                                signInError(result, false);

                            }

                        } else {

                            signInError(result, false);

                        }

                    },
                    error: (error: string | object) => {

                        signInError(error, true);

                    }
                }
            }
        );

    };

    const signInError = (err: string | object, serverError: boolean) => {

        let message: string;
        let shakeEl: string = ".username-wrapper, .pin-wrapper";
        let errorMessageLabel: string = ".username-label .error-message, .pin-label .error-message";
        if (typeof err === 'object') {
            if (serverError) {
                // @ts-ignore
                message = err.message
                console.log(err.xhr)
                console.log(err.status)
                console.error(err.message)
            } else {
                // @ts-ignore
                message = err.message;

                if ("shakeEl" in err) {
                    const shakeElArray = [];
                    const errorMessageLabelArray = []
                    const shakeElSplit = err.shakeEl.split("|");
                    for (let i = 0; i < shakeElSplit.length; i++) {
                        shakeElArray.push(`.${shakeElSplit[i]}-wrapper`);
                        errorMessageLabelArray.push(`.${shakeElSplit[i]}-label .error-message`);
                    }
                    shakeEl = shakeElArray.join(",");
                    errorMessageLabel = errorMessageLabelArray.join(",");
                }

            }
        } else if (typeof err === 'string') {
            message = err;
        } else {
            message = INT18N.text(`ajax/auth/network_error`, defaultLanguage);
        }

        // @ts-ignore
        if (pinModalMini.current !== null) {
            // @ts-ignore
            pinModalMini.current.setValue("");
        }

        f7.store.dispatch("authLoginIsLoding", false);

        setUserEnteredPIN([]);

        setLoginErrorMessage(message);

        f7.emit(`${Konstants.Events.Auth.LOGIN_ERROR}`, message);

        Dom7(shakeEl).addClass("shake");

        Dom7(errorMessageLabel).show();

        setTimeout(function () {
            Dom7(shakeEl).removeClass("shake");
        }, 1000);

        setTimeout(function () {
            Dom7(errorMessageLabel).hide();
        }, 3000);

    }

    const createPINModalMiniKeypadSheet = () => {
        // Create sheet modal
        if (!pinModalMiniKeypadWrapperSheetModal.current) {
            // @ts-ignore
            pinModalMiniKeypadWrapperSheetModal.current = f7.sheet.create({
                backdrop: false,
                swipeToClose: true,
                animate: true,
                content: `
                  <div id="numpad-mini-sheet-modal" class="sheet-modal">
                    <div class="sheet-modal-inner">
                      <div class="page-content">
                        <div id="numpad-mini" />
                      </div>
                    </div>
                  </div>
                `.trim(),
            });

        }

        // @ts-ignore
        pinModalMiniKeypadWrapperSheetModal.current.open();

        // Create pin keypad
        if (!pinModalMiniKeypad.current) {
            // @ts-ignore
            pinModalMiniKeypad.current = f7.keypad.create({
                inputEl: '#numpad-mini-input',
                containerEl: '#numpad-mini',
                toolbar: false,
                backdrop: false,
                dotButton: false,
                valueMaxLength: authLoginPINLength,
                openIn: "auto",
                formatValue: (value: React.SetStateAction<string>) => {
                    value = value.toString();
                    setUserEnteredPIN(value.split(""));
                    setPassword(value);
                    Dom7('#numpad-mini-input').val(value);
                },
                on: {
                    change: (keypad: any, value: string | any[]) => {
                        console.log(keypad, value);
                        value = value.toString();
                        if (value.length === authLoginPINLength) {
                            const pinArray: string[] = value.split("");
                            if (pinArray.length === authLoginPINLength) {
                                f7.sheet.close('#numpad-mini-sheet-modal');
                                setTimeout(() => {
                                    signIn(value);
                                }, 100)
                            }
                        }
                    }
                }
            });
        }

        // @ts-ignore
        pinModalMiniKeypad.current.open();

    };

    return (
        <React.Fragment>
            <LoginScreenTitle>
                <img className="login-screen-logo close-pin-keypad" src={ImageAssets.loginScreenLogo} />
            </LoginScreenTitle>
            <Block>
                <List noHairlinesMd>
                    <div key={'username-label-key'} className={"label-wrapper username-label"}>
                        {INT18N.text(`labels/auth/username`, defaultLanguage)}
                        <br />
                        <span className={"red-text d-none error-message"}>{loginErrorMessage}</span>
                    </div>
                    <ListInput
                        key={'username-input-key'}
                        className={"username-wrapper username-input close-pin-keypad"}
                        outline
                        type="text"
                        placeholder={INT18N.text(`labels/auth/username_placeholder`, defaultLanguage)}
                        clearButton
                        value={username}
                        onInput={(e) => {
                            setUsername(e.target.value);
                        }}
                    >
                    </ListInput>

                    {authLoginWithPIN ? (

                    <React.Fragment>

                        <div key={'pin-label-key'} className={"label-wrapper pin-label m-t-16"}>
                            {INT18N.text(`labels/auth/pin`, defaultLanguage)}
                            <br />
                            <span className={"red-text d-none error-message"}>{loginErrorMessage}</span>
                        </div>
                        <Row key={'pin-wrapper-key'} className={"pin-wrapper"} onClick={() => { createPINModalMiniKeypadSheet(); }}>
                            {[...Array(authLoginPINLength).keys()].map((pinInputDot, pinInputDotIndex)=>(
                            <Col key={`pin-wrapper-col-${pinInputDotIndex}`}>
                                <div className="display-flex justify-content-center align-items-center pin-input" >
                                    {userEnteredPIN.length > pinInputDot && (
                                        <p className="pin-bullet">{Konstants.Dots.black}</p>
                                    )}
                                    {userEnteredPIN.length < (pinInputDot+1) && (
                                        <p className="pin-bullet">&nbsp;</p>
                                    )}
                                </div>
                            </Col>
                            ))}
                        </Row>

                    </React.Fragment>

                    ):(

                    <React.Fragment>

                        <div key={'pin-label-key'} className={"label-wrapper pin-label"}>
                            {INT18N.text(`labels/auth/password`, defaultLanguage)}
                            <br />
                            <span className={"red-text d-none error-message"}>{loginErrorMessage}</span>
                        </div>
                        <ListInput
                            key={'pin-input-key'}
                            className={"pin-wrapper pin-input close-pin-keypad"}
                            outline
                            type="text"
                            placeholder={INT18N.text(`labels/auth/password_placeholder`, defaultLanguage)}
                            clearButton
                            value={password}
                            onInput={(e) => {
                                setPassword(e.target.value);
                            }}
                        >
                        </ListInput>  

                    </React.Fragment>

                    )}

                    <div key={'remember-me-checkbox-wrapper-key'} className={"label-wrapper"}>
                        <Checkbox
                            name="checkbox-1"
                            value={rememberMe.value}
                            checked={rememberMe.checked}
                            onChange={(e) => onRememberMe(e)}
                        /> {INT18N.text(`labels/auth/remember_me`, defaultLanguage)}
                    </div>
                </List>
            </Block>
            <Block strong>
                <Button large fill preloader color="red" loading={authLoginIsLoading} onClick={signIn} className={"login-button"}>
                    {INT18N.text(`buttons/signin`, defaultLanguage)}
                </Button>
            </Block>
            <List className={"d-none"}>
                <ListButton key={'sign-up-button-key'} href="/register/">{INT18N.text(`buttons/no_account`, defaultLanguage)}</ListButton>
                <ListButton key={'sign-up-button-key'} href="/recover/">{INT18N.text(`buttons/recover_account`, defaultLanguage)}</ListButton>
                <ListButton key={'sign-in-button-key'} onClick={signInSocial}>{INT18N.text(`buttons/sign_social`, defaultLanguage)}</ListButton>
            </List>
            <BlockFooter key={'copyright-text-key'} className={"m-t-24"} >
                {INT18N.text(`labels/legal/copyright`, defaultLanguage)}
            </BlockFooter>
            <div className="sheet-modal sheet-swipe-to-close-sign-in-with-social" style={{ height: "auto" }}>
                <div className="sheet-modal-inner">
                    <div className="page-content">
                        <div className="block-title block-title-medium">
                            {INT18N.text(`labels/auth/signin_social_title`, defaultLanguage)}
                        </div>
                        <div className="block">
                            <span>
                                {INT18N.text(`labels/auth/signin_social_subtitle`, defaultLanguage)}
                            </span>
                        </div>
                        <div className="list media-list">
                            <ul>
                                {appData.socialAccountsArray.map((item: any, index: number) => (
                                    <li key={`social-media-account-key-${index}`}>
                                        <a href="#" className="item-link item-content"
                                            onClick={(e) => signInViaSocialAccount(item)} >
                                            <div className="item-media">
                                                <span>
                                                    <i className="f7-icons" style={{ color: `${item.color} !important`, opacity: 1 }}>{item.icon}</i>
                                                </span>
                                            </div>
                                            <div className="item-inner">
                                                <div className="item-title-row no-chevron">
                                                    <div className="item-title">
                                                        {(INT18N.text(`labels/auth/signin_social_label`, defaultLanguage)).toString().formatVars(item.title)}
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" id="numpad-mini-input" />
        </React.Fragment>
    );
}

export default LoginWidget;