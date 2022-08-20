import React, { useCallback, useEffect, useState } from "react";

import {
  Page,
  List,
  ListItem,
  SkeletonBlock,
  Preloader,
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

  const [imChatsLoading, setIMChatsLoading] = useStorageIM(K.ModuleComponentsLibs.im.dataStores.imChatsLoading, false);

  const [imListChats, setIMListChats] = useStorageIM(K.ModuleComponentsLibs.im.dataStores.imListChats, []);

  const [chatItemsPerView, setChatItemsPerView] = useState(20);

  const [hasMoreChats, setHasMoreChats] = useState(true);

  const [chatBatchLength, setChatBatchLength] = useState(chatItemsPerView);

  const loadMoreChats = useCallback(() => {
      if (chatBatchLength === imListChats.length) {
        setHasMoreChats(false);
      } else {
        setChatBatchLength(chatBatchLength + chatItemsPerView);
      }
  },[imListChats]);

  const ChatListViewItem = ({ chat, index }): JSX.Element => {

    return <ListItem 
        
        key={`im-chat-list-item-key-${index}`}
        id={`im-chat-list-item-key-${index}`}
        link="#"
        mediaItem
        onClick={() => onOpenMessage(chat)}
        title={chat.displayName}
        after={moment(chat.time).format('HH:mm')}
        className={`${chat.badge > 5 ? 'has-badge' : ''} ${chat.isMute ? 'is-mute' : ''}`}
      >

        <div 
          className="im-list-view-avatar-wrapper" 
          slot="media" 
          onTouchStart={() => onOpenProfile(chat)}>

          <IMListViewAvatar
            userOnlineStatus={Snippets.modules.im.getListViewUserOnlineStatus(chat.userOnlineStatus)}
            avatarSrc={chat.avatar}
            canvasWidth={48}
            elementId={index}
          />

        </div>

        <span 
          className="im-list-view-subtitle" 
          slot="subtitle" 
          dangerouslySetInnerHTML={{ __html: Snippets.modules.im.getListViewSubTitle(chat) }} />

        {chat.badge > 5 && (

          <div 
            slot="after" 
            className={"badge im-list-view-after-badge"} >
            {chat.badge}
          </div>

        )}

        {chat.isMute && (

          <div 
            slot="after" 
            className={"im-list-view-after-mute"} >
            <Icon 
              ios="f7:speaker_slash_fill" 
              md="f7:speaker_slash_fill" 
              aurora="f7:speaker_slash_fill" />
          </div>

        )}

      </ListItem>

  };

  const ChatListViewSkeletonItem = ({itemsCount}): JSX.Element => {

    return (

      <React.Fragment>

      {[...Array(itemsCount).keys()].map((n) => (

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

      ))}

      </React.Fragment>

    )

  };

  const renderIMChatsListView = (chats: any) => {

    var chatListItems = [];

      chats.map((chatItem: ListViewMessage, chatIndex: number) => {

        if (chatIndex < chatBatchLength) {

          chatListItems.push(

            <ChatListViewItem 
              id={`chat-list-item-${chatIndex}`} 
              key={`chat-list-item-${chatIndex}`} 
              chat={chatItem} 
              chatIndex={chatIndex} 
            />

          );

        }

      });

    return chatListItems;

  }

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

        {imChatsLoading ? (
          
          <List
            mediaList
            noChevron
            noHairlines
            noHairlinesBetween
            className="search-list searchbar-found im-tab-content-chats-searchbar-found"
          >

            <ChatListViewSkeletonItem itemsCount={skeletonList.count} />

          </List>
        
        ):(
          
          imListChats.length > 0 ? (
            
            <InfiniteScroll
              className={`search-list searchbar-found im-tab-content-chats-searchbar-found list media-list  no-chevron no-hairlines no-hairlines-between`}
              pageStart={0}
              loadMore={loadMoreChats}
              hasMore={hasMoreChats}
              loader={<Preloader />}
              useWindow={false}
            >
              <ul>
                
                {renderIMChatsListView(imListChats.reverse())}

              </ul>

            </InfiniteScroll>

          ):(

            <h2>Empty Chats</h2>

          ))
          
        }

    </Page>

  );

};
