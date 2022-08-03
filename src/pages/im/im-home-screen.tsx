import React, { useEffect, useState  } from 'react';
import { Page, 
  Navbar, NavTitle, NavRight, 
  Searchbar, theme, 
  Toolbar, Link, Tabs, Tab, 
  Fab, Icon, f7, f7ready, useStore } from 'framework7-react';

import IMTabContentChats from './components/im-tab-content-chats';

import navBarLogo from '../../assets/images/logo-typographical-white.png';

import store from '../../pages/im/store/im-store';

export default () => {

  //const imHomeScreenTabs = useState(store.getters.imHomeScreenTabsData.value);

  const imHomeScreenTabs = store.state.imHomeScreenTabsData;

  const imTabVisible = (e: any, tabContent: { tabLink: any; tabClass: any; tabActive: any; slug?: any; view: any; skeletonList?: any; tabText?: string | undefined; iconIos?: string | undefined; iconMd?: string | undefined; iconAurora?: string | undefined; iconOnly?: boolean | undefined; highlight?: boolean | undefined; badge?: number | undefined; }, tabIndex: number) => {
    console.log(":: SHOW ::", e, tabContent, tabIndex);
  }

  const imTabInHidden = (e: any, tabContent: { tabLink: any; tabClass: any; tabActive: any; slug?: any; view: any; skeletonList?: any; tabText?: string | undefined; iconIos?: string | undefined; iconMd?: string | undefined; iconAurora?: string | undefined; iconOnly?: boolean | undefined; highlight?: boolean | undefined; badge?: number | undefined; }, tabIndex: number) => {
    console.log(":: HIDE ::", e, tabContent, tabIndex);
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
                  />
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

              <Fab position="right-bottom"
                  className={"m-b-0"}
                  slot="fixed"
                  color="blue"
                  >
                  <Icon
                      ios="f7:arrow_up_circle_fill"
                      aurora="f7:arrow_up_circle_fill"
                      md="material:send"/>
              </Fab>

    </Page>

  )

};

