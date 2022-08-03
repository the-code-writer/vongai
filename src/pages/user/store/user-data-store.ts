
import { createStore } from 'framework7/lite';

const userDataStore = createStore({
  
  state: {

    /*----- Start Instant Messenger State Variables -----*/

    //IM Screen Tab Data

    userData : [
      {
        tabLink: "tab-im-camera",
        tabText: "",
        tabClass: "tab-im-camera",
        tabActive: false,
        iconIos: "f7:camera_fill",
        iconMd: "f7:camera_fill",
        iconAurora: "f7:camera_fill",
        iconOnly: true,
        view: "IMTabContentCamera",
        slug: "im-tab-content-camera",
        highlight: false,
        badge: 0
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
        badge: 53
      },
      {
        tabLink: "tab-im-stories",
        tabText: "Status",
        tabClass: "tab-im-stories",
        tabActive: false,
        iconIos: "",
        iconMd: "",
        iconAurora: "f7:person_2_square_stack_fill",
        iconOnly: false,
        view: "IMTabContentStories",
        slug: "im-tab-content-stories",
        highlight: true,
        badge: 0
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
        badge: 1
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

    imHomeScreenTabsData({ state }, data) {
      state.imHomeScreenTabsData = data;
    },

    // IM Chats

    setIMChatsLoading({ state }, isLoading) {
      state.imChatsLoading = isLoading;
    },

    addIMChat({ state }, Chat) {
      let currentIMChatsState = state.imChats;
      currentIMChatsState[Chat.id] = Chat;
      state.imChats = currentIMChatsState;
    },

    setIMChats({ state }, data) {
      state.imChats = data;
    },

    setIMChatsUnread({ state }, count) {
      state.imChatsUnread = count;
    },

    setIMChatsIncreament({ state }) {
      state.imChatsUnread = state.imChatsUnread+1;
    },

    setIMChatsDecreament({ state }) {
      state.imChatsUnread = state.imChatsUnread-1;
    },

    setIMListChatsLoading({ state }, isLoading) {
      state.imListChatsLoading = isLoading;
    },

    addIMListChats({ state }, data) {
      state.imListChats = [...state.imListChats, data];
    },

    setIMListChats({ state }, data) {
      state.imListChats = data;
    },

    // IM Stories

    setIMStoriesLoading({ state }, isLoading) {
      state.imStoriesLoading = isLoading;
    },

    setIMStoriesViewed({ state }, data) {
      state.imStoriesViewed = data;
    },

    addIMStoriesViewed({ state }, story) {
      state.imStoriesViewed = [...state.imStoriesViewed, story];
    },

    setIMStoriesNotViewed({ state }, data) {
      state.imStoriesNotViewed = data;
    },

    addIMStoriesNotViewed({ state }, story) {
      state.imStoriesNotViewed = [...state.imStoriesNotViewed, story];
    },

    setIMStoriesMuted({ state }, data) {
      state.imStoriesMuted = data;
    },

    addIMStoriesMuted({ state }, story) {
      state.imStoriesMuted = [...state.imStoriesMuted, story];
    },

    setIMMyStoriesMuted({ state }, data) {
      state.imMyStories = data;
    },

    addIMMyStories({ state }, story) {
      state.imMyStories = [...state.imMyStories, story];
    },

    // IM Calls

    setIMCallsLoading({ state }, isLoading) {
      state.imCallsLoading = isLoading;
    },

    addIMCall({ state }, Call) {
      let currentIMCallsState = state.imCalls;
      currentIMCallsState[Call.id] = Call;
      state.imCalls = currentIMCallsState;
    },

    setIMCalls({ state }, data) {
      state.imCalls = data;
    },

    setIMCallsUnread({ state }, count) {
      state.imCallsUnread = count;
    },

    setIMCallsIncreament({ state }) {
      state.imCallsUnread = state.imCallsUnread+1;
    },

    setIMCallsDecreament({ state }) {
      state.imCallsUnread = state.imCallsUnread-1;
    },

    setIMListCallsLoading({ state }, isLoading) {
      state.imListCallsLoading = isLoading;
    },

    addIMListCalls({ state }, data) {
      state.imListCalls = [...state.imListCalls, data];
    },

    setIMListCalls({ state }, data) {
      state.imListCalls = data;
    },

    // IM Channels

    setIMChannelsLoading({ state }, isLoading) {
      state.imChannelsLoading = isLoading;
    },

    addIMChannel({ state }, Channel) {
      let currentIMChannelsState = state.imChannels;
      currentIMChannelsState[Channel.id] = Channel;
      state.imChannels = currentIMChannelsState;
    },

    setIMChannels({ state }, data) {
      state.imChannels = data;
    },

    setIMChannelsUnread({ state }, count) {
      state.imChannelsUnread = count;
    },

    setIMChannelsIncreament({ state }) {
      state.imChannelsUnread = state.imChannelsUnread+1;
    },

    setIMChannelsDecreament({ state }) {
      state.imChannelsUnread = state.imChannelsUnread-1;
    },

    setIMListChannelsLoading({ state }, isLoading) {
      state.imListChannelsLoading = isLoading;
    },

    addIMListChannels({ state }, data) {
      state.imListChannels = [...state.imListChannels, data];
    },

    setIMListChannels({ state }, data) {
      state.imListChannels = data;
    },

    // IM Bots

    setIMBotsLoading({ state }, isLoading) {
      state.imBotsLoading = isLoading;
    },

    addIMBot({ state }, Bot) {
      let currentIMBotsState = state.imBots;
      currentIMBotsState[Bot.id] = Bot;
      state.imBots = currentIMBotsState;
    },

    setIMBots({ state }, data) {
      state.imBots = data;
    },

    setIMBotsUnread({ state }, count) {
      state.imBotsUnread = count;
    },

    setIMBotsIncreament({ state }) {
      state.imBotsUnread = state.imBotsUnread+1;
    },

    setIMBotsDecreament({ state }) {
      state.imBotsUnread = state.imBotsUnread-1;
    },

    setIMListBotsLoading({ state }, isLoading) {
      state.imListBotsLoading = isLoading;
    },

    addIMListBots({ state }, data) {
      state.imListBots = [...state.imListBots, data];
    },

    setIMListBots({ state }, data) {
      state.imListBots = data;
    },

    /*----- End Instant Messenger Setters Actions -----*/

  },
})

export default userDataStore;
