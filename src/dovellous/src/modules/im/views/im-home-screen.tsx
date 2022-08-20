import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Page,
  Navbar,
  NavTitle,
  NavRight,
  Searchbar,
  theme,
  Popover,
  List,
  ListItem,
  Block,
  Toolbar,
  Link,
  Tabs,
  Tab,
  Fab,
  FabBackdrop,
  FabButtons,
  FabButton,
  Chip,
  Icon,
  f7,
  f7ready,
  useStore,
} from "framework7-react";
import { initializeApp } from "firebase/app";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

import IMTabContentChats from "../widgets/im-tab-content-chats";

import IMTabContentStories from "../widgets/im-tab-content-stories";

import navBarLogo from "../../../../assets/img/logo-typographical-white.png";

import {StorageIM} from "../store/im-store";

import Dom7 from "dom7";

export default ({onTabIndexChanged, onOpenIMPopupContactsList, onOpenMessage, onOpenProfile}) => { 

  const [currentTabIndex, setCurrentTabIndex] = useState(1);

  const [fabButton, setFabButton] = useState(StorageIM.getters.imFabButtonMeta.value[currentTabIndex]);

  const imTabVisible = (
    e: any,
    tabContent: {
      tabLink: any;
      tabClass: any;
      tabActive: any;
      slug?: any;
      view: any;
      skeletonList?: any;
      tabText?: string | undefined;
      iconIos?: string | undefined;
      iconMd?: string | undefined;
      iconAurora?: string | undefined;
      iconOnly?: boolean | undefined;
      highlight?: boolean | undefined;
      badge?: number | undefined;
    },
    tabIndex: number
  ) => {

    onTabIndexChanged(tabIndex);

    setCurrentTabIndex(tabIndex);

    setFabButton(StorageIM.getters.imFabButtonMeta.value[tabIndex]);

    switch(tabIndex){

      case 0: {

        break;

      }

      case 1: {

        break;

      }

      case 2: {

        break;

      }

      case 3: {

        break;

      }

      default: {
        Dom7("#im-home-screen-nav").show();
        Dom7("#im-home-screen-toolbar").show();
        break;        
      }

    }

  };

  const imTabInHidden = (
    e: any,
    tabContent: {
      tabLink: any;
      tabClass: any;
      tabActive: any;
      slug?: any;
      view: any;
      skeletonList?: any;
      tabText?: string | undefined;
      iconIos?: string | undefined;
      iconMd?: string | undefined;
      iconAurora?: string | undefined;
      iconOnly?: boolean | undefined;
      highlight?: boolean | undefined;
      badge?: number | undefined;
    },
    tabIndex: number
  ) => {
    //console.log(":: HIDE ::", e, tabContent, tabIndex);
  };

  const imFabButtonClickHandler = (payload:any, tabIndex:number)=>{

    switch(payload.slug.toString().toLowerCase()){      
      case"sheet-modal-open-camera":  {
        onOpenIMPopupContactsList(payload, tabIndex);
        break;
      }
      case"sheet-modal-open-chats":  {
        onOpenIMPopupContactsList(payload, tabIndex);
        break;
      }
      case"sheet-modal-open-stories":  {
        break;
      }
      case"sheet-modal-open-stories-composer":  {
        onOpenIMPopupContactsList(payload, tabIndex);
        break;
      }
      case"sheet-modal-open-stories-camera":  {
        onOpenIMPopupContactsList(payload, tabIndex);
        break;
      }
      case"sheet-modal-open-stories-gallery":  {
        onOpenIMPopupContactsList(payload, tabIndex);
        break;
      }
      case"sheet-modal-open-calls":  {
        onOpenIMPopupContactsList(payload, tabIndex);
        break;
      }
      default: {
        break;
      }
    }

  }

  const socialSignIn = async (provider: string) => {
    let signInResult: any = "";

    switch (provider) {
      case "GOOGLE": {
        const result = await FirebaseAuthentication.signInWithGoogle();

        signInResult = result.user;

        break;
      }

      case "FACEBOOK": {
        //const result = await FirebaseAuthentication.signInWithFacebook();

        //signInResult = result.user;

        break;
      }

      case "TWITTER": {
        const result = await FirebaseAuthentication.signInWithTwitter();

        signInResult = result.user;

        break;
      }

      case "APPLE": {
        const result = await FirebaseAuthentication.signInWithApple();

        signInResult = result.user;

        break;
      }

      case "PHONE": {

        const { verificationId } = await FirebaseAuthentication.signInWithPhoneNumber({
            phoneNumber: "+263772128622",
          });

        f7.dialog.prompt(
          "Please enter the verification code that was sent to your mobile device.",
          async (verificationCode) => {
            const result = await FirebaseAuthentication.signInWithPhoneNumber({
              verificationId,
              verificationCode,
            });

            console.warn("::: RESULT :::", result);

            signInResult = result.user;
          }
        );

        break;
      }

      case "CONTACTS": {
        Contacts.getContacts().then((result) => {
          console.log(result);

          for (const contact of result.contacts) {
            console.log(contact);
          }
        });

        break;
      }

      default: {
        const result = await FirebaseAuthentication.signInWithGoogle();

        signInResult = result.user;

        break;
      }
    }

    console.warn("::: SIGN IN RESULT :::", signInResult);

    return signInResult;

  };

  useEffect(() => {

    f7ready((framework7IO) => {

    });

  }, []);

  return (
    <Page className="hide-navbar-on-scroll" pageContent={true}>
      <Navbar id="im-home-screen-nav" sliding={false}>
        <NavTitle sliding className={"no-padding-left"}>
          <Link className="no-padding-left" panelOpen="left" >
            <img className="nav-bar-logo" src={navBarLogo} alt="Logo" />
          </Link>
        </NavTitle>
        <NavRight>
          <Link
            searchbarEnable=".searchbar-demo"
            iconIos="f7:search"
            iconAurora="f7:search"
            iconMd="material:search"
          />
          <Link
            iconIos="f7:ellipsis_vertical"
            iconAurora="f7:ellipsis_vertical"
            iconMd="material:more_vert"
            popoverOpen=".popover-menu"
          />
        </NavRight>
        <Searchbar
          className="searchbar-demo"
          expandable
          searchContainer=".search-list"
          searchIn=".item-title, .item-subtitle, .item-text"
          disableButton={!theme.aurora}
          disableButtonText="Cancel"
          placeholder="Search..."
          clearButton={true}
        >
        </Searchbar>
      </Navbar>

      <Toolbar id="im-home-screen-toolbar" tabbar top>

        {StorageIM.getters.imHomeScreenTabsData.value.map(
          (
            tabLinkItem: {
              tabLink: any;
              tabActive: boolean | undefined;
              tabText: string | undefined;
              tabClass: string | undefined;
              iconIos: string | undefined;
              iconMd: string | undefined;
              iconAurora: string | undefined;
              iconOnly: boolean | undefined;
              badge: string | number | undefined;
            },
            tabLinkIndex: number
          ) => (
            <Link
              key={`tab-im-key-${tabLinkIndex}`}
              tabLink={`#${tabLinkItem.tabLink}`}
              tabLinkActive={tabLinkItem.tabActive}
              text={tabLinkItem.tabText}
              className={tabLinkItem.tabClass}
              iconIos={tabLinkItem.iconIos}
              iconMd={tabLinkItem.iconMd}
              iconAurora={tabLinkItem.iconAurora}
              iconOnly={tabLinkItem.iconOnly}
              badge={tabLinkItem.badge}
            />
          )
        )}
      </Toolbar>

      <Tabs swipeable>
        {StorageIM.getters.imHomeScreenTabsData.value.map(
          (
            tabContentItem: {
              tabLink: any;
              tabClass: any;
              tabActive: any;
              slug?: any;
              view: any;
              skeletonList?: any;
              tabText?: string;
              iconIos?: string;
              iconMd?: string;
              iconAurora?: string;
              iconOnly?: boolean;
              highlight?: boolean;
              badge?: number;
            },
            tabContentItemIndex: number
          ) => (
            <Tab
              key={`tab-content-im-key-${tabContentItemIndex}`}
              id={tabContentItem.tabLink}
              className={tabContentItem.tabClass}
              tabActive={tabContentItem.tabActive}
              onTabShow={(e: any) =>
                imTabVisible(e, tabContentItem, tabContentItemIndex)
              }
              onTabHide={(e: any) =>
                imTabInHidden(e, tabContentItem, tabContentItemIndex)
              }
            >
              {/*

                { tabContentItem.view === "IMTabContentCamera" &&(

                  <IMTabContentCamera
                    key={`im-tab-content-camera-key`}
                    id={`im-tab-content-camera-key`}
                    className={`im-tab-content-camera`}
                    slug={tabContentItem.tabClass} 
                    view={tabContentItem.view} 
                  />

                )}

                */}

              { tabContentItem.view === "IMTabContentChats" &&(

                <IMTabContentChats
                  className={`im-tab im-tab-content-chats ${tabContentItem.slug}-id`}
                  skeletonList={tabContentItem.skeletonList}
                  key={`${tabContentItem.slug}-key`}
                  id={`${tabContentItem.slug}-id`}
                  slug={tabContentItem.slug}
                  onOpenMessage={onOpenMessage}
                  onOpenProfile={onOpenProfile}
                />

              )}

              { tabContentItem.view === "IMTabContentStories" &&(

                <IMTabContentStories
                  className={`im-tab im-tab-content-stories ${tabContentItem.slug}-id`}
                  skeletonList={tabContentItem.skeletonList}
                  key={`${tabContentItem.slug}-key`}
                  id={`${tabContentItem.slug}-id`}
                  slug={tabContentItem.slug}
                  onOpenMessage={onOpenMessage}
                  onOpenProfile={onOpenProfile}
                />

              )}

              {/*

                { tabContentItem.view === "IMTabContentCalls" &&(

                  <IMTabContentCalls
                    key={`im-tab-content-calls-key`}
                    id={`im-tab-content-calls-key`}
                    className={`im-tab-content-calls`}
                    slug={tabContentItem.tabClass} 
                    view={tabContentItem.view} 
                  />

                )}

                { tabContentItem.view === "IMTabContentChannels" &&(

                  <IMTabContentChannels
                    key={`im-tab-content-channels-key`}
                    id={`im-tab-content-channels-key`}
                    className={`im-tab-content-channels`}
                    slug={tabContentItem.tabClass} 
                    view={tabContentItem.view} 
                  />

                )}

                { tabContentItem.view === "IMTabContentBots" &&(

                  <IMTabContentBots
                    key={`im-tab-content-bots-key`}
                    id={`im-tab-content-bots-key`}
                    className={`im-tab-content-bots`}
                    slug={tabContentItem.tabClass} 
                    view={tabContentItem.view}
                  />

                )}

                */}
            </Tab>
          )
        )}
      </Tabs>

      <FabBackdrop slot="fixed" />

      <Fab 
        position="right-bottom" 
        className={"m-b-0"} 
        slot="fixed" 
        onClick={()=>imFabButtonClickHandler(fabButton, currentTabIndex)} >
        <Icon
          ios={`f7:${fabButton.icons.md}`}
          aurora={`f7:${fabButton.icons.md}`}
          md={`material:${fabButton.icons.md}`}
        />
        {fabButton.buttons.length>0&&(
            <Icon ios="f7:xmark" aurora="f7:xmark" md="material:close" />
        )}
        {fabButton.buttons.length>0&&(
            <FabButtons position="top" className="fab-button-popup">
              {fabButton.buttons.map((button: any, buttonIndex: number) => (
                <FabButton
                  onClick={()=>imFabButtonClickHandler(button, currentTabIndex)}
                  fabClose={true}
                  key={`fab-button-${buttonIndex}`}
                  label={`${button.label}`}
                >
                  <Icon
                    ios={`f7:${button.icons.md}`}
                    aurora={`f7:${button.icons.md}`}
                    md={`material:${button.icons.md}`}
                  />
                </FabButton>
              ))}
            </FabButtons>
        )}
      </Fab>
      
    </Page>
  );

};
