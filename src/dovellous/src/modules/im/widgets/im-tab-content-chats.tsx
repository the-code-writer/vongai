import React, { useEffect, useState } from "react";

import {
  Page,
  List,
  ListItem,
  SkeletonBlock,
  f7ready,
  Icon,
} from "framework7-react";

import Dom7 from "dom7";

import moment from 'moment';

import InfiniteScroll from "react-infinite-scroller";

import {K, Snippets} from "../../../libraries/app/helpers";

import {ListViewMessage} from '../../../libraries/intefaces/im';

import { useStorageIM } from "../store/im-store";

import IMListViewAvatar from "../../user/components/im-list-view-avatar";

import IMListViewStoriesAvatar from "../../user/components/im-list-view-stories-avatar";

export default ({ id, slug, className, skeletonList, onOpenMessage, onOpenProfile }): JSX.Element => {

  const [imChatsLoading, setIMChatsLoading] = useStorageIM(K.ModuleComponentsLibs.im.dataStores.imChatsLoading, true);

  const [imListChats, setIMListChats] = useStorageIM(K.ModuleComponentsLibs.im.dataStores.imListChats, []);

  useEffect(() => {

    console.log(":: USE EFFECT ::imListChats::", imListChats);

  }, [imListChats]);

  return (

    <Page id={`${id}`} name={`${slug}`} className={`page ${className}`}>

      <List className="searchbar-not-found im-tab-content-chats-searchbar-not-found">
        <div style={{ textAlign: "center", marginTop: "64px" }}>
          No chats found
        </div>
      </List>

      <List
        mediaList
        noChevron
        className="search-list searchbar-found im-tab-content-chats-searchbar-found no-hairlines no-hairlines-between"
      >
        {imChatsLoading ? (
          
          [...Array(skeletonList.count).keys()].map((n) => (

            <ListItem
              key={n}
              className={`skeleton-text skeleton-effect-${skeletonList.effect}`}
              title={`${skeletonList.title}`}
              subtitle={`${skeletonList.subtitle}`}
              after={`00:00`}
            >

              <SkeletonBlock
                slot="media"
                tag={"div"}
                width={"44px"}
                height={"44px"}
                borderRadius={"50%"}
                effect={`wave`}
              />

            </ListItem>

          ))
        
        ):(
          
          imListChats.length > 0 ? (
          
            imListChats.reverse().map((chat: ListViewMessage, index: number) => (

              <ListItem
                key={`im-chat-list-item-key-${index}`}
                id={`im-chat-list-item-key-${index}`}
                link="#"
                onClick={()=>onOpenMessage(chat)}
                title={chat.displayName}
                after={moment(chat.time).format('HH:mm')}
                className={`${chat.badge > 5 ? 'has-badge':''} ${chat.isMute ? 'is-mute':''}`}
              >

                <div className="im-list-view-avatar-wrapper" slot="media" onTouchStart={()=>onOpenProfile(chat)}>

                  <IMListViewAvatar 
                    userOnlineStatus={Snippets.modules.im.getListViewUserOnlineStatus(chat.userOnlineStatus)}
                    avatarSrc={chat.avatar} 
                    canvasWidth={48} 
                    elementId={index}
                    />
{/*
                <IMListViewStoriesAvatar
                  avatarSrc={chat.avatar}
                  elementId={index}
                  canvasWidth={48}
                  unseenSegments={chat.unseen}
                  totalSegments={10}
                  segmentColorSeen={Dom7('html').hasClass('dark')?`rgb(127,127,127)`:`rgb(200,200,200)`}
                  segmentColorUnSeen={Dom7('html').hasClass('dark')?`rgb(76,255,80)`:`rgb(76,175,80)`}
                  backgroundColor={Dom7('html').hasClass('dark')?`rgb(28,28,29)`:`rgb(255,255,255)`}
                  />
*/} 
                </div>

                <span className="im-list-view-subtitle" slot="subtitle" dangerouslySetInnerHTML={{ __html: Snippets.modules.im.getListViewSubTitle(chat) }} />

                {chat.badge > 5 && (
                  
                <div slot="after" className={"badge im-list-view-after-badge"} >
                  {chat.badge}
                </div>

                )}

                {chat.isMute && (
                  
                <div slot="after" className={"im-list-view-after-mute"} >
                  <Icon ios="f7:speaker_slash_fill" md="f7:speaker_slash_fill" aurora="f7:speaker_slash_fill" />
                </div>

                )}

              </ListItem>

            ))
          
          ):(

            <h2>Empty Chats</h2>

          ))
          
        }

      </List>

    </Page>

  );

};
