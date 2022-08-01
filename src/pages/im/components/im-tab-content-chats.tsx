import React, { useEffect, useState  } from 'react';
import {
    Page,
    Navbar,
    NavTitle,
    NavRight,
    Link,
    List,
    ListItem,
    Searchbar,
    SkeletonBlock,
    theme,
    useStore,
    f7, f7ready
} from 'framework7-react';

export default ({ f7route, f7router }): JSX.Element => {

    let imChatsLoading: any;

    let imChats: any;

    let imChatsUnread: any;

    let imListChatsLoading: any;

    let imListChats: any[];

    useEffect(() => {
        // load users when component mounted
        setTimeout(() => {
            //f7.store.dispatch('getJobs', -1);
        },500);

    }, []);

    useEffect(() => {
        f7ready((f7) => {
          
            imChatsLoading = f7.params.data.instantMessengerStore.useStore('imChatsLoading');

            imChats = f7.params.data.instantMessengerStore.useStore('imChats');

            imChatsUnread = f7.params.data.instantMessengerStore.useStore('imChatsUnread');

            imListChatsLoading = f7.params.data.instantMessengerStore.useStore('imListChatsLoading');

            imListChats = f7.params.data.instantMessengerStore.useStore('imListChats');

        });
      }, []);

    return (

        <Page name='home' className='im-tab-content-chats-page'>

            {/* Page content */}
            <List className="searchbar-not-found im-tab-content-chats-search">
                <div style={{textAlign: "center", marginTop: "64px"}}>
                    No chats found
                </div>
            </List>

            <List mediaList noChevron className="search-list searchbar-found">

            {imListChatsLoading ? (

                    [1, 2, 3, 4, 5, 6, 7].map((n) => (

                        <ListItem
                            key={n}
                            className={`skeleton-text skeleton-effect-wave`}
                            title="Morbi lobortis et massa"
                            subtitle="Cras consequat"
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        >

                            <SkeletonBlock
                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
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
                            
                            <div slot="media" className={"andon-status"}/>

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