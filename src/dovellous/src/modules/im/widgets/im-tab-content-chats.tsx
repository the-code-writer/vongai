import React, { useEffect, useState } from "react";

import {
  Page,
  List,
  ListItem,
  SkeletonBlock,
  f7ready,
  Icon,
} from "framework7-react";

import { StorageIM, useStorageIM } from "../store/im-store";

interface DF7Icon {
  ios: string;
  md: string;
  aurora: string;
}

interface DeliveryStatus {
  icon: DF7Icon,
  class: string
};

interface MessageType {
  type: string; 
  iconClass: any; 
  icon: { ios: any; }; 
}

interface ListViewMessage { 
  isTyping: any; 
  isDeleted: any; 
  hasOwnProperty: (arg0: string) => DeliveryStatus; 
  deliveryStatus: any; 
  isGroup: any; 
  isSent: any; 
  senderName: any; 
  messageType: MessageType; 
  text: string; 
}

export default ({ id, slug, className, skeletonList }): JSX.Element => {

  const [listViewLoading, setListViewLoading] = useState(true);

  const [imListChats, setIMListChats] = useStorageIM('imListChats', []);

  const getDeliveryStatus = (status: any) : DeliveryStatus => {

    const _status:DeliveryStatus = {
      icon: {
        ios: '',md: '', aurora: ''
      },
      class: 'delivery-icon-default'
    };
    
    switch(status){

      case 'DF7_DS_X' : { //Failed
        _status.icon = {
          ios: '',
          md: '',
          aurora: ''
        };
        _status.class = 'delivery-icon-error';
        break;
      }

      case 'DF7_DS_0' : { //Pending
        _status.icon = {
          ios: '',
          md: '',
          aurora: ''
        };
        break;
      }

      case 'DF7_DS_1' : { //Sent
        _status.icon = {
          ios: '',
          md: '',
          aurora: ''
        };
        break;
      }

      case 'DF7_DS_2' : { //Delivered
        _status.icon = {
          ios: '',
          md: '',
          aurora: ''
        };
        break;
      }

      case 'DF7_DS_3' : { //READ
        _status.icon = {
          ios: '',
          md: '',
          aurora: ''
        };
        _status.class = 'delivery-icon-info';
        break;
      }

      default: { //PENDING
        _status.icon = {
          ios: '',
          md: '',
          aurora: ''
        };
        _status.class = 'delivery-icon-default';
        break;
      }

    }

    return _status;

  }

  const getListViewSubTitle = (chat: ListViewMessage) : string =>{

    let textHtml: string = '';

    if(chat.isTyping){
      return '<span class="color-green">Typing...</span>';
    }

    if(chat.isDeleted){
      return '<i class="f7-icons im-list-view-subtitle-icon">trash</i> <em>This message was deleted</em>';
    }

    if(chat.hasOwnProperty('deliveryStatus')){
      textHtml += `<i class="f7-icons im-list-view-subtitle-icon-delivery-status ${getDeliveryStatus(chat.deliveryStatus).class} ">${getDeliveryStatus(chat.deliveryStatus).icon}</i> `;
    }

    if(chat.isGroup){
      textHtml += (chat.isSent ? `You: `:`${chat.senderName}: `);
    }

    if(chat.messageType.type !== 'Text'){
      textHtml += `<i class="f7-icons im-list-view-subtitle-icon ${chat.messageType.iconClass}">${chat.messageType.icon.ios}</i> ${chat.messageType.type} `;      
      textHtml += `: ${chat.text}`;
    }

    if(chat.messageType.type === 'Text'){
      textHtml += chat.text;
    }

    return textHtml;

  };

  useEffect(() => {

    setListViewLoading(false);

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
        className="search-list searchbar-found im-tab-content-chats-searchbar-found no-hairlines"
      >
        {listViewLoading ? (
          
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
          
            imListChats.reverse().map((chat: any, index: number) => (

              <ListItem
                key={`im-chat-list-item-key-${index}`}
                id={`im-chat-list-item-key-${index}`}
                link={`/im/chat/${chat.uuid}/0/`}
                title={chat.title}
                after={chat.after}
                className={`${chat.badge > 5 ? 'has-badge':''} ${chat.isMute ? 'is-mute':''}`}
              >

                <div slot="media" className={"user-online-status"} />

                <img
                  slot="media"
                  src={chat.avatar}
                  width="48"
                  height="48"
                  className="rounded"
                  alt=""
                />

                <span className="im-list-view-subtitle" slot="subtitle" dangerouslySetInnerHTML={{ __html: getListViewSubTitle(chat) }} />

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
