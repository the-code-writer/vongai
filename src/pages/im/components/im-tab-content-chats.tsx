import React, { useEffect, useState } from "react";
import {
  Page,
  List,
  ListItem,
  SkeletonBlock,
  f7ready,
} from "framework7-react";

import { StorageIM } from "../../../pages/im/store/im-store";

export default ({ id, slug, className, skeletonList }): JSX.Element => {
    
  useEffect(() => {

    f7ready((framework7IO) => {

      //

    });

  }, []);

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
        className="search-list searchbar-found im-tab-content-chats-searchbar-found"
      >
        {StorageIM.getters.imListChats.value.length === 0 ? [...Array(skeletonList.count).keys()].map((n) => (
              
              <ListItem
                key={n}
                className={`skeleton-text skeleton-effect-${skeletonList.effect}`}
                title={`${skeletonList.title}`}
                subtitle={`${skeletonList.subtitle}`}
                text={`${skeletonList.text}`}
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
          : StorageIM.getters.imListChats.value.map((chat: any, index: number) => (

              <ListItem
                key={`im-chat-list-item-key-${index}`}
                id={`im-chat-list-item-key-${index}`}
                link={`/im/chat/${chat.uuid}/`}
                title={chat.username}
                after={chat.timestamp}
                badge={chat.unread}
                subtitle={chat.subTitle}
                text={chat.text}
              >
                
                <div slot="media" className={"user-online-status"} />

                <img
                  slot="media"
                  src={chat.avatar}
                  width="48"
                  className="rounded"
                  alt=""
                />

              </ListItem>
            ))}
      </List>
    </Page>
  );
};
