  
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

  export {IMCallConfigInterface, DF7Icon, DeliveryStatus, MessageType, ListViewMessage}