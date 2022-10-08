import Encryption from '../cryptography/encryption';
import FileSystem from '../filesystem';

import { DeliveryStatus, ListViewMessage } from '../intefaces/im';

const Snippets = {

  numbers: {

    randomInterger: (highestNumber:number, lowestNumber:number) => {
      return Math.floor(Math.random() * (highestNumber - lowestNumber)) + lowestNumber;
    },

    randomFloat: (highestNumber:number, lowestNumber:number) => {
      return (Math.random() * (highestNumber - lowestNumber)) + lowestNumber;
    },

    formatPhoneNumber: (str, styleNumber) => {
      //Filter only numbers from the input
      let cleaned = ('' + str).replace(/\D/g, '');
      //Check if the input is of correct length
      let match = cleaned.match(/^(\d{1,5})(\d{2})(\d{3})(\d{4})$/);
      if (match) {
        if (typeof styleNumber !== "undefined" && styleNumber) {
          return '+' + match[1] + '(' + match[2] + ')' + match[3] + '-' + match[4];
        } else {
          return '+' + match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4];
        }
      };
      return str
    },

    fornartMoney: (amount, decimalCount = 2, currency = "$", decimal = ".", thousands = ",") => {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return currency + " " + negativeSign +
          (j ? i.substr(0, j) + thousands : '') +
          i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
          (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e)
      }
    },

  },

  strings: {

    isBooleanTrue: (str: any) => {
      return String(str).toLowerCase() !== "false";
    },

    isBooleanFalse: (str: any) => {
      return String(str).toLowerCase() === "false";
    },

    format: (str, ...args) => {
      var str = str.toString();
      if (args.length) {
        var t = typeof args[0];
        var key;
        var args = ("string" === t || "number" === t) ?
          Array.prototype.slice.call(args)
          : args[0];

        for (key in args) {
          str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
      }

      return str;

    },

    hash: {

      md5: (str) => {

        return str;

      },

      sha1: (str) => {

        return str;

      },

      sha128: (str) => {

        return str;

      },

      sha256: (str) => {

        return str;

      },

    },

    generateColor: (str) => {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      var colour = '';
      for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
      }
      return colour;
    },

  },

  urls: {

    url2hash: (url: string, ext?: string) => {

      return `${Encryption.md5(url)}.${ext}`;

    },

    parse: (url: string) => {

      return url;

    }
    ,

    clean: (url: string) => {

      return url;

    }

  },

  encryption: Encryption,

  json: {

    getJsonDataFromStringNotation: (dataObject: any, key: string, separator: string) => {

      let keys = key.split(separator);

      let value = keys.reduce((a, c) => a[c], dataObject);

      return value;

    },

  },

  html: {

    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {string} str Input text
     * @param {boolean} replaceMode Use replace instead of insert
     * @param {boolean} isXhtml Use XHTML
     * @return {string} Filtered text
     */
    nl2br: (str: string, replaceMode: any, isXhtml: any) => {

      var breakTag = (isXhtml) ? '<br />' : '<br>';
      var replaceStr = (replaceMode) ? '$1' + breakTag : '$1' + breakTag + '$2';
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);

    },

    /**
     * This function inverses text from PHP's nl2br() with default parameters.
     *
     * @param {string} str Input text
     * @param {boolean} replaceMode Use replace instead of insert
     * @return {string} Filtered text
     */
    br2nl: (str: string, replaceMode: any) => {

      var replaceStr = (replaceMode) ? "\n" : '';
      // Includes <br>, <BR>, <br />, </br>
      return str.replace(/<\s*\/?br\s*[\/]?>/gi, replaceStr);
    },

  },

  arrays: {

    getArray: (obj: { [x: string]: any; }) => {
      //console.warn(":: OBJ ::", obj);
      const arr = Object.keys(obj).map((key) => [key, obj[key]]);
      //console.warn(":: ARR ::", arr);
      return arr;

    }

  },
  files: {


    lib: FileSystem,
    /**
     * Format bytes as human-readable text.
     *
     * @param bytes Number of bytes.
     * @param si True to use metric (SI) units, aka powers of 1000. False to use
     *           binary (IEC), aka powers of 1024.
     * @param dp Number of decimal places to display.
     *
     * @return Formatted string.
     */
    humanFileSize: (bytes: string | number, si = false, dp = 1) => {
      const thresh = si ? 1000 : 1024;

      if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
      }

      const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
      let u = -1;
      const r = 10 ** dp;

      do {
        bytes /= thresh;
        ++u;
      } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


      return bytes.toFixed(dp) + ' ' + units[u];
    },
    getFileSize: async (url: string | URL) => {

      var fileSize = '';

      var http = new XMLHttpRequest();

      http.open('HEAD', url, false); // false = Synchronous

      http.send(null); // it will stop here until this http request is complete

      // when we are here, we already have a response, b/c we used Synchronous XHR

      if (http.status === 200) {

        fileSize = await http.getResponseHeader('content-length');

        return fileSize;

      } else {

        return 0;

      }

    }

  },

  modules: {

    im: {

      getListViewSubTitle: (chat: ListViewMessage): string => {

        let textHtml: string = '';

        if (chat.isTyping) {
          return '<span class="color-green">Typing...</span>';
        }

        if (chat.isDeleted) {
          return '<i class="f7-icons im-list-view-subtitle-icon">trash</i> <em>This message was deleted</em>';
        }

        if (chat.hasOwnProperty('deliveryStatus')) {
          textHtml += `<i class="f7-icons im-list-view-subtitle-icon-delivery-status ${Snippets.modules.im.getDeliveryStatus(chat.deliveryStatus).class} ">${Snippets.modules.im.getDeliveryStatus(chat.deliveryStatus).icon.ios}</i> `;
        }

        if (chat.isGroup) {
          textHtml += (chat.isSent ? `You: ` : `${chat.senderName}: `);
        }

        if (chat.messageType.type !== 'Text') {
          textHtml += `<i class="f7-icons im-list-view-subtitle-icon ${chat.messageType.iconClass}">${chat.messageType.icon.ios}</i> ${chat.messageType.type} `;
          textHtml += `: ${chat.text}`;
        }

        if (chat.messageType.type === 'Text') {
          textHtml += chat.text;
        }

        return textHtml;

      },

      getDeliveryStatus: (status: any): DeliveryStatus => {

        const _status: DeliveryStatus = {
          icon: {
            ios: '', md: '', aurora: ''
          },
          class: 'default'
        };

        switch (parseInt(status)) {

          case 0: { //Failed
            _status.icon = {
              ios: 'exclamationmark_circle_fill',
              md: '',
              aurora: 'exclamationmark_circle_fill'
            };
            _status.class = 'error';
            break;
          }

          case 1: { //Pending
            _status.icon = {
              ios: 'timer',
              md: '',
              aurora: 'timer'
            };
            break;
          }

          case 2: { //Sent
            _status.icon = {
              ios: 'checkmark',
              md: '',
              aurora: 'checkmark'
            };
            break;
          }

          case 3: { //Delivered
            _status.icon = {
              ios: 'checkmark_2',
              md: '',
              aurora: 'checkmark_2'
            };
            break;
          }

          case 4: { //READ
            _status.icon = {
              ios: 'checkmark_2',
              md: '',
              aurora: 'checkmark_2'
            };
            _status.class = 'info';
            break;
          }

          case 5: { //Failed
            _status.icon = {
              ios: 'exclamationmark_circle_fill',
              md: '',
              aurora: 'exclamationmark_circle_fill'
            };
            _status.class = 'error';
            break;
          }

          case 6: { //Pending
            _status.icon = {
              ios: 'timer',
              md: '',
              aurora: 'timelapse'
            };
            break;
          }

          case 7: { //Sent
            _status.icon = {
              ios: 'checkmark',
              md: '',
              aurora: 'checkmark'
            };
            break;
          }

          case 8: { //Delivered
            _status.icon = {
              ios: 'checkmark_2',
              md: '',
              aurora: 'checkmark_2'
            };
            break;
          }

          case 9: { //READ
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

      },

      getListViewUserOnlineStatus: (onlineStatus: any): string => {

        let _status: string;

        switch (parseInt(onlineStatus)) {

          case 0: {
            _status = 'offline';
            break;
          }

          case 1: {
            _status = 'online';
            break;
          }

          case 2: {
            _status = 'away';
            break;
          }

          case 3: {
            _status = 'busy';
            break;
          }

          case 4: {
            _status = 'private';
            break;
          }

          case 5: {
            _status = 'offline';
            break;
          }

          case 6: {
            _status = 'online';
            break;
          }

          case 7: {
            _status = 'away';
            break;
          }

          case 8: {
            _status = 'busy';
            break;
          }

          case 9: {
            _status = 'private';
            break;
          }

          default: {
            _status = 'unavailable';
            break;
          }

        }

        return _status;

      },



    }

  },

  errors: {

    getErrorFromCode: (code: number) => {
      
      return `ERROR: ${code}`;

    },

  }

}

export default Snippets;