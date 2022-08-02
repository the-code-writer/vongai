import React, { useEffect, useState  } from 'react';
import {
    Page, List, ListItem, SkeletonBlock, f7, f7ready
} from 'framework7-react';

export default ({ id,  slug, view, className, skeletonList}): JSX.Element => {

        const imChatsLoading = f7.params.data.instantMessengerStore.useStore('imChatsLoading');

        const imChats = f7.params.data.instantMessengerStore.useStore('imChats');

        const imChatsUnread = f7.params.data.instantMessengerStore.useStore('imChatsUnread');

        const imListChatsLoading = f7.params.data.instantMessengerStore.useStore('imListChatsLoading');

        const imListChats = f7.params.data.instantMessengerStore.useStore('imListChats');

        const userAccountData = f7.params.data.userAccountData.useStore('userAccountData');

        let componentViewId = '';

    useEffect(() => {

        f7ready((f7) => {
          
            componentViewId = view;

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
                            className={"skeleton-text skeleton-effect-${${skeletonList.effect}}"}
                            title="${skeletonList.title}Morbi lobortis et massa"
                            subtitle="${skeletonList.subtitle}Cras consequat"
                            text="${skeletonList.text}Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        >

                            <SkeletonBlock
                                style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                                slot="media" 
                                tag={''} 
                                width={''} 
                                height={''} 
                                effect={'blink'} 
                                borderRadius={''}                            
                            />

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