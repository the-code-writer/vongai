
import * as React from 'react';

import { createStore } from 'framework7/lite';

const StorageIM = createStore({
  
  state: {

    /*----- Start Instant Messenger State Variables -----*/

    //IM Screen Tab Data

    imHomeScreenTabsData : [
      {
        tabLink: "tab-im-apps",
        tabText: "",
        tabClass: "tab-im-apps",
        tabActive: false,
        iconIos: "f7:rectangle_grid_2x2",
        iconMd: "material:grid_view",
        iconAurora: "f7:rectangle_grid_2x2",
        iconOnly: true,
        view: "IMTabContentApps",
        slug: "im-tab-content-apps",
        highlight: false,
        badge: 0,
        skeletonList: {
          count: 5,
          effect:"wave",
          title:"Morbi lobortis et massa",
          subtitle:"Cras consequat",
          text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
      },
      {
        tabLink: "tab-im-chats",
        tabText: "Chats",
        tabClass: "tab-im-chats",
        tabActive: true,
        iconIos: "",
        iconMd: "",
        iconAurora: "f7:bubble_left_bubble_right_fill",
        iconOnly: false,
        view: "IMTabContentChats",
        slug: "im-tab-content-chats",
        highlight: false,
        badge: 53,
        skeletonList: {
          count: 5,
          effect:"wave",
          title:"Morbi lobortis et massa",
          subtitle:"Cras consequat",
          text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
      },
      {
        tabLink: "tab-im-stories",
        tabText: "Status •",
        tabClass: "tab-im-stories",
        tabActive: false,
        iconIos: "",
        iconMd: "",
        iconAurora: "f7:person_2_square_stack_fill",
        iconOnly: false,
        view: "IMTabContentStories",
        slug: "im-tab-content-stories",
        highlight: true,
        badge: 0,
        skeletonList: {
          count: 5,
          effect:"wave",
          title:"Morbi lobortis et massa",
          subtitle:"Cras consequat",
          text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
      },
      {
        tabLink: "tab-im-calls",
        tabText: "Calls",
        tabClass: "tab-im-calls",
        tabActive: false,
        iconIos: "",
        iconMd: "",
        iconAurora: "f7:phone_fill",
        iconOnly: false,
        view: "IMTabContentCalls",
        slug: "im-tab-content-calls",
        highlight: false,
        badge: 1,
        skeletonList: {
          count: 5,
          effect:"wave",
          title:"Morbi lobortis et massa",
          subtitle:"Cras consequat",
          text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
      },
    ],

    
    imFabButtonMeta : [
    {
      icons: {
        ios: "",
        md: "photo_camera",
        aurora: "",
      },
      slug: "sheet-modal-open-camera",
      title: "Capture",
      buttons: []
    },
    {
      icons: {
        ios: "",
        md: "chat",
        aurora: "",
      },
      slug: "sheet-modal-open-chats",
      label: "Chat",
      buttons: []
    },
    {
      icons: {
        ios: "plus",
        md: "add",
        aurora: "plus",
      },
      slug: "sheet-modal-open-stories",
      label: "Create Story",
      buttons: [
        {
          icons: {
            ios: "pencil",
            md: "edit",
            aurora: "pencil",
          },
          label: "Type a status",
          slug: "sheet-modal-open-stories-composer",
        },
        {
          icons: {
            ios: "photo_on_rectangle",
            md: "photo_camera",
            aurora: "photo_on_rectangle",
          },
          label: "Take a photo",
          slug: "sheet-modal-open-stories-camera",
        },
        {
          icons: {
            ios: "photo_on_rectangle",
            md: "collections",
            aurora: "photo_on_rectangle",
          },
          label: "Select from gallery",
          slug: "sheet-modal-open-stories-gallery",
        },
      ],
    },
    {
      icons: {
        ios: "",
        md: "add_call",
        aurora: "",
      },
      slug: "sheet-modal-open-calls",
      label: "Call",
      buttons: []
    },
  ],


    // IM Chats

    imChatsLoading: false,

    imChats: {},

    imChatsUnread: 0,

    imListChatsLoading: false,

    imListChats: [],

    // IM Stories

    imStoriesLoading: false,

    imStoriesViewed: [],

    imStoriesNotViewed: [],

    imStoriesMuted: [],

    imMyStories: [],

    // IM Calls

    imCallsLoading: false,

    imCalls: {},

    imCallsUnread: 0,

    imListCallsLoading: false,

    imListCalls: [],

    // IM Channels

    imChannelsLoading: false,

    imChannels: {},

    imChannelsUnread: 0,

    imListChannelsLoading: false,

    imListChannels: [],

    // IM Bots

    imBotsLoading: false,

    imBots: {},

    imBotsUnread: 0,

    imListBotsLoading: false,

    imListBots: [],

    /*----- End Instant Messenger State Variables -----*/

  },
  getters: {
    
    /*----- Start Instant Messenger Getters -----*/

    //IM Screen Tab Data

    imFabButtonMeta({ state }) {
      return state.imFabButtonMeta;
    },

    //IM Screen Tab Data

    imHomeScreenTabsData({ state }) {
      return state.imHomeScreenTabsData;
    },

    // IM Chats

    imChatsLoading({ state }) {
      return state.imChatsLoading;
    },

    imChats({ state }) {
      return state.imChats;
    },

    imChatsUnread({ state }) {
      return state.imChatsUnread;
    },

    imListChatsLoading({ state }) {
      return state.imListChatsLoading;
    },

    imListChats({ state }) {
      return state.imListChats;
    },

    // IM Stories

    imStoriesLoading({ state }) {
      return state.imStoriesLoading;
    },

    imStoriesViewed({ state }) {
      return state.imStoriesViewed;
    },

    imListStoriesNotViewed({ state }) {
      return state.imListStoriesNotViewed;
    },

    imListStoriesMuted({ state }) {
      return state.imListStoriesMuted;
    },

    imMyStories({ state }) {
      return state.imMyStories;
    },

    // IM Calls

    imCallsLoading({ state }) {
      return state.imCallsLoading;
    },

    imCalls({ state }) {
      return state.imCalls;
    },

    imCallsUnread({ state }) {
      return state.imCallsUnread;
    },

    imListCallsLoading({ state }) {
      return state.imListCallsLoading;
    },

    imListCalls({ state }) {
      return state.imListCalls;
    },

    // IM Channels

    imChannelsLoading({ state }) {
      return state.imChannelsLoading;
    },

    imChannels({ state }) {
      return state.imChannels;
    },

    imChannelsUnread({ state }) {
      return state.imChannelsUnread;
    },

    imListChannelsLoading({ state }) {
      return state.imListChannelsLoading;
    },

    imListChannels({ state }) {
      return state.imListChannels;
    },

    // IM Bots

    imBotsLoading({ state }) {
      return state.imBotsLoading;
    },

    imBots({ state }) {
      return state.imBots;
    },

    imBotsUnread({ state }) {
      return state.imBotsUnread;
    },

    imListBotsLoading({ state }) {
      return state.imListBotsLoading;
    },

    imListBots({ state }) {
      return state.imListBots;
    },

    /*----- End Instant Messenger Getters -----*/

  },
  actions: {

    /*----- Start Instant Messenger Setters / Actions -----*/

    //IM Screen Tab Data

    imFabButtonMeta({ state }, data) {
      state.imFabButtonMeta = data;
    },

    //IM Screen Tab Data

    imHomeScreenTabsData({ state }, data) {
      state.imHomeScreenTabsData = data;
    },

    // IM Chats

    imChatsLoading({ state }, isLoading) {
      state.imChatsLoading = isLoading;
    },

    addIMChat({ state }, Chat) {
      let currentIMChatsState = state.imChats;
      currentIMChatsState[Chat.id] = Chat;
      state.imChats = currentIMChatsState;
    },

    imChats({ state }, data) {
      state.imChats = data;
    },

    imChatsUnread({ state }, count) {
      state.imChatsUnread = count;
    },

    imChatsIncreament({ state }) {
      state.imChatsUnread = state.imChatsUnread+1;
    },

    imChatsDecreament({ state }) {
      state.imChatsUnread = state.imChatsUnread-1;
    },

    imListChatsLoading({ state }, isLoading) {
      state.imListChatsLoading = isLoading;
    },

    addIMListChats({ state }, data) {
      state.imListChats = [...state.imListChats, data];
    },

    imListChats({ state }, data) {
      state.imListChats = data;
    },

    // IM Stories

    imStoriesLoading({ state }, isLoading) {
      state.imStoriesLoading = isLoading;
    },

    imStoriesViewed({ state }, data) {
      state.imStoriesViewed = data;
    },

    addIMStoriesViewed({ state }, story) {
      state.imStoriesViewed = [...state.imStoriesViewed, story];
    },

    imStoriesNotViewed({ state }, data) {
      state.imStoriesNotViewed = data;
    },

    addIMStoriesNotViewed({ state }, story) {
      state.imStoriesNotViewed = [...state.imStoriesNotViewed, story];
    },

    imStoriesMuted({ state }, data) {
      state.imStoriesMuted = data;
    },

    addIMStoriesMuted({ state }, story) {
      state.imStoriesMuted = [...state.imStoriesMuted, story];
    },

    imMyStoriesMuted({ state }, data) {
      state.imMyStories = data;
    },

    addIMMyStories({ state }, story) {
      state.imMyStories = [...state.imMyStories, story];
    },

    // IM Calls

    imCallsLoading({ state }, isLoading) {
      state.imCallsLoading = isLoading;
    },

    addIMCall({ state }, Call) {
      let currentIMCallsState = state.imCalls;
      currentIMCallsState[Call.id] = Call;
      state.imCalls = currentIMCallsState;
    },

    imCalls({ state }, data) {
      state.imCalls = data;
    },

    imCallsUnread({ state }, count) {
      state.imCallsUnread = count;
    },

    imCallsIncreament({ state }) {
      state.imCallsUnread = state.imCallsUnread+1;
    },

    imCallsDecreament({ state }) {
      state.imCallsUnread = state.imCallsUnread-1;
    },

    imListCallsLoading({ state }, isLoading) {
      state.imListCallsLoading = isLoading;
    },

    addIMListCalls({ state }, data) {
      state.imListCalls = [...state.imListCalls, data];
    },

    imListCalls({ state }, data) {
      state.imListCalls = data;
    },

    // IM Channels

    imChannelsLoading({ state }, isLoading) {
      state.imChannelsLoading = isLoading;
    },

    addIMChannel({ state }, Channel) {
      let currentIMChannelsState = state.imChannels;
      currentIMChannelsState[Channel.id] = Channel;
      state.imChannels = currentIMChannelsState;
    },

    imChannels({ state }, data) {
      state.imChannels = data;
    },

    imChannelsUnread({ state }, count) {
      state.imChannelsUnread = count;
    },

    imChannelsIncreament({ state }) {
      state.imChannelsUnread = state.imChannelsUnread+1;
    },

    imChannelsDecreament({ state }) {
      state.imChannelsUnread = state.imChannelsUnread-1;
    },

    imListChannelsLoading({ state }, isLoading) {
      state.imListChannelsLoading = isLoading;
    },

    addIMListChannels({ state }, data) {
      state.imListChannels = [...state.imListChannels, data];
    },

    imListChannels({ state }, data) {
      state.imListChannels = data;
    },

    // IM Bots

    imBotsLoading({ state }, isLoading) {
      state.imBotsLoading = isLoading;
    },

    addIMBot({ state }, Bot) {
      let currentIMBotsState = state.imBots;
      currentIMBotsState[Bot.id] = Bot;
      state.imBots = currentIMBotsState;
    },

    imBots({ state }, data) {
      state.imBots = data;
    },

    imBotsUnread({ state }, count) {
      state.imBotsUnread = count;
    },

    imBotsIncreament({ state }) {
      state.imBotsUnread = state.imBotsUnread+1;
    },

    imBotsDecreament({ state }) {
      state.imBotsUnread = state.imBotsUnread-1;
    },

    imListBotsLoading({ state }, isLoading) {
      state.imListBotsLoading = isLoading;
    },

    addIMListBots({ state }, data) {
      state.imListBots = [...state.imListBots, data];
    },

    imListBots({ state }, data) {
      state.imListBots = data;
    },

    /*----- End Instant Messenger Setters Actions -----*/

  },
})

export {StorageIM};
