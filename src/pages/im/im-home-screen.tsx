import React, { useEffect, useState  } from 'react';
import { Page, 
  Navbar, NavTitle, NavRight, 
  Searchbar, theme, Popover,
  List, ListItem, Block,
  Toolbar, Link, Tabs, Tab, 
  Fab, FabBackdrop, FabButtons, FabButton, Chip, Icon, f7, f7ready, useStore } from 'framework7-react';
  import { initializeApp } from 'firebase/app';
  import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
  import { Contacts } from '@capacitor-community/contacts'
import IMTabContentChats from './components/im-tab-content-chats';

import navBarLogo from '../../assets/images/logo-typographical-white.png';

import store from '../../pages/im/store/im-store';

export default () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCauR1flLkrZUbgx_dQDbBL8Mu_bDEaHJg",
    authDomain: "vong-ai.firebaseapp.com",
    projectId: "vong-ai",
    storageBucket: "vong-ai.appspot.com",
    messagingSenderId: "244888151725",
    appId: "1:244888151725:web:b05acaf6f64adc7643c824",
    measurementId: "G-RL7K8ZLF1L"
  };
  const app = initializeApp(firebaseConfig);
  const fabButtonMeta = [
    {
      icons: {
        ios: '', md: 'photo_camera', aurora: ''
      },
      slug: 'sheet-modal-open-contact', title: 'Capture', action: 'openCameraSheetModal'
    },
    {
      icons: {
        ios: '', md: 'chat', aurora: ''
      },
      slug: 'sheet-modal-open-contact', title: 'Chat', action: 'openChatSheetModal'
    },
    {
      icons: {
        ios: '', md: 'photo_camera', aurora: ''
      },
      slug: 'sheet-modal-open-contact', title: 'Create Story', action: 'openStoriesSheetModal'
    },
    {
      icons: {
        ios: '', md: 'call', aurora: ''
      },
      slug: 'sheet-modal-open-contact', title: 'Call', action: 'openCallSheetModal'
    },
  ];

  const [tabCurrentIndex, setTabCurrentIndex] = useState(1);

  const [fabButton, setFabButton] = useState(fabButtonMeta[tabCurrentIndex]);

  const imHomeScreenTabs = store.state.imHomeScreenTabsData;

  const imTabVisible = (e: any, tabContent: { tabLink: any; tabClass: any; tabActive: any; slug?: any; view: any; skeletonList?: any; tabText?: string | undefined; iconIos?: string | undefined; iconMd?: string | undefined; iconAurora?: string | undefined; iconOnly?: boolean | undefined; highlight?: boolean | undefined; badge?: number | undefined; }, tabIndex: number) => {
    console.log(":: SHOW ::", e, tabContent, tabIndex);
    setTabCurrentIndex(tabIndex);
    setFabButton(fabButtonMeta[tabIndex]);
  }

  const imTabInHidden = (e: any, tabContent: { tabLink: any; tabClass: any; tabActive: any; slug?: any; view: any; skeletonList?: any; tabText?: string | undefined; iconIos?: string | undefined; iconMd?: string | undefined; iconAurora?: string | undefined; iconOnly?: boolean | undefined; highlight?: boolean | undefined; badge?: number | undefined; }, tabIndex: number) => {
    console.log(":: HIDE ::", e, tabContent, tabIndex);
  }

  const socialSignIn = async (provider: string) => {
  
    let signInResult:any = '';
  
    switch(provider) {
  
      case 'GOOGLE': {
  
        const result = await FirebaseAuthentication.signInWithGoogle();
        signInResult = result.user;  
        break;
  
      }
  
      case 'FACEBOOK': {
  
        //const result = await FirebaseAuthentication.signInWithFacebook();
        //signInResult = result.user;  
        break;
  
      }
  
      case 'TWITTER': {
  
        const result = await FirebaseAuthentication.signInWithTwitter();
        signInResult = result.user;  
        break;
  
      }
  
      case 'APPLE': {
  
        const result = await FirebaseAuthentication.signInWithApple();
        signInResult = result.user;  
        break;
  
      }
  
      case 'PHONE': {
  
        const { verificationId } = await FirebaseAuthentication.signInWithPhoneNumber(
          {
            phoneNumber: '+263772128622',
          },
        );
        const verificationCode = window.prompt(
          'Please enter the verification code that was sent to your mobile device.',
        );

        f7.dialog.prompt('Please enter the verification code that was sent to your mobile device.', async function (verificationCode) {
          const result = await FirebaseAuthentication.signInWithPhoneNumber({
            verificationId,
            verificationCode,
          });
          
          console.warn("::: RESULT :::", result);

          signInResult = result.user; 
          
        });

        break;
  
      }
  
      case 'CONTACTS': {
  
        Contacts.getContacts().then(result => {
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
  
  }
  
  useEffect(() => {

    f7ready((framework7IO) => {
      
      console.warn("::: framework7IO - imHomeScreenTabs :::", imHomeScreenTabs);

    });

  }, []);

  return( 

    <Page pageContent={false}>

      <Navbar sliding={false}>

                  <NavTitle sliding className={"no-padding-left"}>
                      <Link className="no-padding-left">
                          <img className="nav-bar-logo" src={navBarLogo} alt="Logo"/>
                      </Link>
                  </NavTitle>
                  <NavRight>
                      <Link
                          searchbarEnable=".searchbar-demo"
                          iconIos="f7:search"
                          iconAurora="f7:search"
                          iconMd="material:search"
                      />
                      <Link iconIos="f7:ellipsis_vertical" iconAurora="f7:ellipsis_vertical" iconMd="material:more_vert"
                            popoverOpen=".popover-menu"/>
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
                        <div slot="after-inner">
                        <Block strong>
                          <Chip text="Photos" mediaBgColor="transparent">
                            <Icon
                              slot="media"
                              ios="f7:plus_circle"
                              aurora="f7:plus_circle"
                              md="material:image"
                            />
                          </Chip>
                          <Chip text="Videos" mediaBgColor="transparent">
                            <Icon
                              slot="media"
                              ios="f7:plus_circle"
                              aurora="f7:plus_circle"
                              md="material:videocam"
                            />
                          </Chip>
                          <Chip text="Links" mediaBgColor="transparent">
                            <Icon
                              slot="media"
                              ios="f7:plus_circle"
                              aurora="f7:plus_circle"
                              md="material:link"
                            />
                          </Chip>
                          <Chip text="GIFs" mediaBgColor="transparent">
                            <Icon
                              slot="media"
                              ios="f7:plus_circle"
                              aurora="f7:plus_circle"
                              md="material:gif"
                            />
                          </Chip>
                          <Chip text="Audio" mediaBgColor="transparent">
                            <Icon
                              slot="media"
                              ios="f7:plus_circle"
                              aurora="f7:plus_circle"
                              md="material:volume_down"
                            />
                          </Chip>
                          <Chip text="Documents" mediaBgColor="transparent">
                            <Icon
                              slot="media"
                              ios="f7:plus_circle"
                              aurora="f7:plus_circle"
                              md="material:article"
                            />
                          </Chip>
                        </Block>
                        </div>
                  </Searchbar>
              </Navbar>

      <Toolbar tabbar top>

      { imHomeScreenTabs.map((tabLinkItem: { tabLink: any; tabActive: boolean | undefined; tabText: string | undefined; tabClass: string | undefined; iconIos: string | undefined; iconMd: string | undefined; iconAurora: string | undefined; iconOnly: boolean | undefined; badge: string | number | undefined; }, tabLinkIndex: number) => (

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
              badge={tabLinkItem.badge} />

          )
        
      )}

      </Toolbar>

      <Tabs swipeable>

      { imHomeScreenTabs.map((tabContentItem: { tabLink: any; tabClass: any; tabActive: any; slug?: any; view: any; skeletonList?: any; tabText?: string; iconIos?: string; iconMd?: string; iconAurora?: string; iconOnly?: boolean; highlight?: boolean; badge?: number; }, tabContentItemIndex: number) => (

            <Tab
              key={`tab-content-im-key-${tabContentItemIndex}`}
              id={tabContentItem.tabLink}
              className={tabContentItem.tabClass}
              tabActive={tabContentItem.tabActive}
              onTabShow={(e: any)=>imTabVisible(e, tabContentItem, tabContentItemIndex)}
              onTabHide={(e: any)=>imTabInHidden(e, tabContentItem, tabContentItemIndex)}
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

                { tabContentItem.view === "IMTabContentChats" &&(

                */}

                  <IMTabContentChats
                    className={`im-tab ${tabContentItem.slug}-id`}
                    skeletonList={tabContentItem.skeletonList} 
                    key={`${tabContentItem.slug}-key`}
                    id={`${tabContentItem.slug}-id`}
                    slug={tabContentItem.slug}
                    view={tabContentItem.view}
                  />

                {/*

                )}

                { tabContentItem.view === "IMTabContentStories" &&(

                  <IMTabContentCIMTabContentStories
                    key={`im-tab-content-stories-key`}
                    id={`im-tab-content-stories-key`}
                    className={`im-tab-content-stories`}
                    slug={tabContentItem.tabClass} 
                    view={tabContentItem.view} 
                  />

                )}

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

              <Fab position="right-bottom"
                  className={"m-b-0"}
                  slot="fixed"
                  >
                  <Icon
                      ios={`f7:${fabButton.icons.md}`}
                      aurora={`f7:${fabButton.icons.md}`}
                      md={`material:${fabButton.icons.md}`}/>
                  <Icon ios="f7:xmark" aurora="f7:xmark" md="material:close"></Icon>
                    <FabButtons position="top">
                      <FabButton label="Action 1">1</FabButton>
                      <FabButton label="Action 2">2</FabButton>
                    </FabButtons>
              </Fab>

              <Popover className="popover-menu">
                <List>
                  <ListItem
                    onClick={() => socialSignIn('GOOGLE')}
                    link="#" 
                    popoverClose 
                    title="Google Sign In" 
                  />
                  <ListItem
                    onClick={() => socialSignIn('APPLE')}
                    link="#" 
                    popoverClose 
                    title="Apple Sign In" />
                  <ListItem
                    onClick={() => socialSignIn('FACEBOOK')}
                    link="#" 
                    popoverClose 
                    title="Facebook Sign In" />
                  <ListItem
                    onClick={() => socialSignIn('TWITTER')}
                    link="#" 
                    popoverClose 
                    title="Twitter Sign In" />
                    <ListItem
                      onClick={() => socialSignIn('PHONE')}
                      link="#" 
                      popoverClose 
                      title="Phone Number" />
                  <ListItem
                    onClick={() => socialSignIn('CONTACTS')}
                    link="#" 
                    popoverClose 
                    title="Contacts" />
                </List>
              </Popover>

    </Page>

  )

};

