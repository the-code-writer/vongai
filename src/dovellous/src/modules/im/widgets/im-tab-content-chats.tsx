import React, { useEffect, useState } from "react";

import {
  Page,
  List,
  ListItem,
  SkeletonBlock,
  f7ready,
  Icon,
} from "framework7-react";
import moment from 'moment';
import InfiniteScroll from "react-infinite-scroller";
import { StorageIM, useStorageIM } from "../store/im-store";

import IMListViewAvatar from "../../user/components/im-list-view-avatar";

import IMListViewStoriesAvatar from "../../user/components/im-list-view-stories-avatar";
import Dom7 from "dom7";
 
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
  hasOwnProperty: (
    arg0: string
    ) => DeliveryStatus; 
  messageType: MessageType;
  userOnlineStatus: number; 
  deliveryStatus: any;
  senderName: any;  
  isGroup: any; 
  isSent: any; 
  text: string; 
}

export default ({ id, slug, className, skeletonList, onOpenMessage, onOpenProfile }): JSX.Element => {

  const [listViewLoading, setListViewLoading] = useState(true);

  const [imChatsLoading, setIMChatsLoading] = useStorageIM('imChatsLoading', true);
  const [imListChats, setIMListChats] = useStorageIM('imListChats', []);

  const getDeliveryStatus = (status: any) : DeliveryStatus => {

    const _status:DeliveryStatus = {
      icon: {
        ios: '',md: '', aurora: ''
      },
      class: 'default'
    };
    
    switch(parseInt(status)){

      case 0 : { //Failed
        _status.icon = {
          ios: 'exclamationmark_circle_fill',
          md: '',
          aurora: 'exclamationmark_circle_fill'
        };
        _status.class = 'error';
        break;
      }

      case 1 : { //Pending
        _status.icon = {
          ios: 'timer',
          md: '',
          aurora: 'timer'
        };
        break;
      }

      case 2 : { //Sent
        _status.icon = {
          ios: 'checkmark',
          md: '',
          aurora: 'checkmark'
        };
        break;
      }

      case 3 : { //Delivered
        _status.icon = {
          ios: 'checkmark_2',
          md: '',
          aurora: 'checkmark_2'
        };
        break;
      }

      case 4 : { //READ
        _status.icon = {
          ios: 'checkmark_2',
          md: '',
          aurora: 'checkmark_2'
        };
        _status.class = 'info';
        break;
      }

      case 5 : { //Failed
        _status.icon = {
          ios: 'exclamationmark_circle_fill',
          md: '',
          aurora: 'exclamationmark_circle_fill'
        };
        _status.class = 'error';
        break;
      }

      case 6 : { //Pending
        _status.icon = {
          ios: 'timer',
          md: '',
          aurora: 'timelapse'
        };
        break;
      }

      case 7 : { //Sent
        _status.icon = {
          ios: 'checkmark',
          md: '',
          aurora: 'checkmark'
        };
        break;
      }

      case 8 : { //Delivered
        _status.icon = {
          ios: 'checkmark_2',
          md: '',
          aurora: 'checkmark_2'
        };
        break;
      }

      case 9 : { //READ
        _status.icon = {
          ios: 'checkmark_2',
          md: '',
          aurora: 'checkmark_2'
        };
        _status.class = 'info';
        break;
      }

      default: { //PENDING
        _status.icon = {
          ios: 'timer',
          md: '',
          aurora: 'timer'
        };
        _status.class = 'default';
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
      textHtml += `<i class="f7-icons im-list-view-subtitle-icon-delivery-status ${getDeliveryStatus(chat.deliveryStatus).class} ">${getDeliveryStatus(chat.deliveryStatus).icon.ios}</i> `;
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

  const getListViewUserOnlineStatus = (onlineStatus: any) : string =>{

    let _status: string = '';

    switch(parseInt(onlineStatus)){

      case 0:{
        _status = 'offline';
        break;
      }

      case 1:{
        _status = 'online';
        break;
      }

      case 2:{
        _status = 'away';
        break;
      }

      case 3:{
        _status = 'busy';
        break;
      }

      case 4:{
        _status = 'private';
        break;
      }

      case 5:{
        _status = 'offline';
        break;
      }

      case 6:{
        _status = 'online';
        break;
      }

      case 7:{
        _status = 'away';
        break;
      }

      case 8:{
        _status = 'busy';
        break;
      }

      case 9:{
        _status = 'private';
        break;
      }

      default:{
        _status = 'unavailable';
        break;
      }

    }

    return _status;

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
        className="search-list searchbar-found im-tab-content-chats-searchbar-found no-hairlines no-hairlines-between"
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
          
            imListChats.reverse().map((chat: ListViewMessage, index: number) => (

              <ListItem
                key={`im-chat-list-item-key-${index}`}
                id={`im-chat-list-item-key-${index}`}
                link="#"
                onClick={()=>onOpenMessage(chat)}
                title={chat.title}
                after={moment(chat.after).format('HH:mm')}
                className={`${chat.badge > 5 ? 'has-badge':''} ${chat.isMute ? 'is-mute':''}`}
              >

                <div className="im-list-view-avatar-wrapper" slot="media" onTouchStart={()=>onOpenProfile(chat)}>

                  <IMListViewAvatar 
                    userOnlineStatus={getListViewUserOnlineStatus(chat.userOnlineStatus)}
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
