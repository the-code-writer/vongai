import React, { useEffect, useState  } from 'react';
import {
    Page, List, ListItem, SkeletonBlock, f7, f7ready, useStore,
} from 'framework7-react';

import IMStore from '../../../pages/im/store/im-store';

import UserDataStore from '../../../pages/user/store/user-data-store';

export default ({ id,  slug, view, className, skeletonList}): JSX.Element => {

        let componentViewId = '';

        componentViewId = view;

        let imChatsLoading=[];
        let imChats=[];
        let imChatsUnread=[];
        let imListChatsLoading=[];
        let imListChats=[];
        let userAccountData=[];

    useEffect(() => {

        f7ready((framework7IO) => {
          
            componentViewId = view;

            imChatsLoading = IMStore.state.imChatsLoading;

            imChats = IMStore.state.imChats;
    
            imChatsUnread = IMStore.state.imChatsUnread;
    
            imListChatsLoading = IMStore.state.imListChatsLoading;
    
            imListChats = IMStore.state.imListChats;
    
            userAccountData = UserDataStore.state.userData.userData;
    
        });

      }, []);

    return (

        <Page id={`${id}`} name={`${slug}`} className={`page ${className}`}>

            <List 
                className="searchbar-not-found im-tab-content-chats-searchbar-not-found">
                <div style={{textAlign: "center", marginTop: "64px"}}>
                    No chats found
                </div>
            </List>

            <List 
                mediaList noChevron className="search-list searchbar-found im-tab-content-chats-searchbar-found">

                {imListChatsLoading ? (

                    [...Array(skeletonList.count).keys()].map((n) => (

                        <ListItem
                            key={n}
                            className={`skeleton-text skeleton-effect-${skeletonList.effect}`}
                            title={`${skeletonList.title}`}
                            text={`${skeletonList.text}`}
                            after={`00:00`}
                        >

                        <SkeletonBlock
                                slot="media" 
                                tag={`div`} 
                                width={`44px`} 
                                height={`44px`} 
                                borderRadius={`50%`}                        />

                        </ListItem>

                    ))

                ) : (

                    imListChats.map((chat: any, index: number) => (

                        <ListItem
                            key={`im-chat-list-item-key-${index}`}
                            id={`im-chat-list-item-key-${index}`}
                            link={`/im/chat/${userAccountData.id}/${chat.uuid}/${chat.uuid}/?sessionId=${userAccountData.sessionId}#active`}
                            title={chat.username}
                            after={chat.timestamp}
                            badge={chat.unread}
                            subtitle={chat.subTitle}
                            text={chat.text}
                        >
                            
                            <div 
                                slot="media" 
                                className={"andon-status"}
                            />

                            <img
                                slot="media"
                                src={chat.avatar}
                                width="48"
                                className="rounded"
                                alt=""
                            />

                        </ListItem>

                    ))

                )}

            </List>

        </Page>

    );

};