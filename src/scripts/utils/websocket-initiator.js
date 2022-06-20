import NotifHelper from './notif-helper';

const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    console.log(message.data);
    NotifHelper.sendNotification({
      title: 'Notif from WebSocket',
      options: {
        body: message.data,
        icon: 'icon/icon-192x192.png',
        image: 'https://id.pinterest.com/pin/394909461081791848/',
        vibrate: [200, 100, 200],
      },
    });
  },
};

export default WebSocketInitiator;
