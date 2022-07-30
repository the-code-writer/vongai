import React, {useState} from 'react';
import {
    Page,
    Navbar,
    NavTitle,
    NavRight,
    Button,
    Block,
    Link,
    List,
    ListItem,
    ListInput,
    Searchbar,
    Popup,
    Popover,
    theme,
    f7
} from 'framework7-react';

import Dom7 from "dom7";

//import konstants from "../system/libs/konstants";
//import helper from "../system/libs/helper";

import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

// @ts-ignore
import navBarLogo from "../assets/img/logo-rectangle.png"
import noItemsFoundIcon from "../assets/img/nothing-white.png"
import {Filter7} from "@mui/icons-material";

export default () => {

    const [isLoading, setIsLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    const changeTheme = () => {
        const el = Dom7("html");
        const darkThemeEnabled = !el.hasClass('dark');
/*
        helper.data.setKey(
            'app.themes.dark',
            darkThemeEnabled,
            (data: any) => {
                console.log("DarkThemeEnabled", data);
            }
        );
*/
        el.toggleClass("dark");
    }

    const logOut = () => {
        f7.dialog.confirm(
            "Are you sure you want to logout?",
            () => {
                console.log("Logout");
                f7.emit("AUTH_LOGGED_OUT_USER");
                Dom7("#view-login").show();
                Dom7("#view-main").hide();
            },
            () => {

                console.log("Cancelled Logout");
                /*
                                helper.data.getKey(
                                    'app.themes.dark',
                                    function (data: any){
                                        console.log(data,  "DATA : Cancelled Logout");
                                    }
                                );
                */
            });
    }

    const changeUserPIN = () => {

        f7.changeUserPIN();

    }

    const refreshJobList = () => {

        f7.authorizePIN();

    }

    return (
        <Page name="home">
            {/* Top Navbar */}
            <Navbar sliding={false}>
                <NavTitle sliding className={"no-padding-left"}>
                    <Link className="no-padding-left">
                        <img className="nav-bar-logo" src={navBarLogo}/>
                        <span>My Jobs</span>
                    </Link>
                </NavTitle>
                <NavRight>
                    <Link
                        searchbarEnable=".searchbar-demo"
                        iconIos="f7:search"
                        iconAurora="f7:search"
                        iconMd="material:search"
                    ></Link>
                    <Link iconIos="f7:ellipsis_vertical" iconAurora="f7:ellipsis_vertical" iconMd="material:more_vert"
                          popoverOpen=".popover-menu"/>
                </NavRight>
                <Searchbar
                    className="searchbar-demo"
                    expandable
                    searchContainer=".search-list"
                    searchIn=".item-title, .item-subtitle, .item-text"
                    disableButton={!theme.aurora}
                ></Searchbar>
            </Navbar>
            {/* Page content */}
            <List className="searchbar-not-found">
                <img src={noItemsFoundIcon} style={{width: "100%"}}/>
                <div style={{textAlign: "center", marginTop: "64px"}}>
                    No records found
                </div>
            </List>

            <List mediaList noChevron className="search-list searchbar-found">

                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((value: any, index: number) => (

                        <ListItem
                            key={index}
                            link="/job/1/2/"
                            title="Job #HKL03400000"
                            after="08:45"
                            badge="5"
                            subtitle="Enbee Stores"
                            text="Engine service is available, Toyota Vits..."
                        >
                            <div className={"andon-status"}/>
                            <img
                                slot="media"
                                src="https://hyperefficient2.net/communicator-mobile/cdn/images/enbee.png"
                                width="44"
                                className="rounded"
                            />


                        </ListItem>

                    ))

                }

            </List>
            <Popover className="popover-menu">
                <List  noChevron>
                    <ListItem link="#" popoverClose title="Change PIN" onClick={changeUserPIN}/>
                    <ListItem link="#" popoverClose title="Refresh Jobs" onClick={refreshJobList}/>
                    <ListItem link="#" popoverClose title="Toggle Dark Mode" onClick={changeTheme}/>
                    <ListItem link="#" popoverClose title="Logout" onClick={logOut}/>
                </List>
            </Popover>

        </Page>
    );
};