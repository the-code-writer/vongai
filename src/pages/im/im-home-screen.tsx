import React, {useState} from 'react';
import { Page, 
  Navbar, NavTitle, NavRight, 
  Searchbar, theme, 
  Toolbar, Link, Tabs, Tab, 
  Fab, Icon, useStore } from 'framework7-react';

import IMTabContentChats from './components/im-tab-content-chats';

import navBarLogo from '../../assets/images/logo-typographical-white.png';

export default () => {

  const imHomeScreenTabs = useStore('imHomeScreenTabsData');

  const imTabVisible = (tabContentItem: { tabLink: string; tabText: string; tabClass: string; tabActive: boolean; iconIos: string; iconMd: string; iconAurora: string; iconOnly: boolean; view: string; highlight: boolean; badge: number; }, tabContentItemIndex: number) => {
    throw new Error('Function not implemented.');
  }

  const imTabInHidden = (tabContentItem: { tabLink: string; tabText: string; tabClass: string; tabActive: boolean; iconIos: string; iconMd: string; iconAurora: string; iconOnly: boolean; view: string; highlight: boolean; badge: number; }, tabContentItemIndex: number) => {
    throw new Error('Function not implemented.');
  }

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

      { imHomeScreenTabs.map((tabContentItem, tabContentItemIndex) => (

            <Tab
              key={`tab-content-im-key-${tabContentItemIndex}`}
              id={tabContentItem.tabLink}
              className={tabContentItem.tabClass}
              tabActive={tabContentItem.tabActive}
              tabShow={(e: any)=>imTabVisible(tabContentItem, tabContentItemIndex)}
              tabHide={(e: any)=>imTabInHidden(tabContentItem, tabContentItemIndex)}
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
                    key={`${tabContentItem.slug}-key`}
                    id={`${tabContentItem.slug}-id`}
                    className={`im-tab ${tabContentItem.slug}-id`}
                    slug={tabContentItem.slug}
                    view={tabContentItem.view}
                    skeletonList={tabContentItem.skeletonList} 
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

