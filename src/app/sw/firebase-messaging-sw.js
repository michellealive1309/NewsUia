importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '281789257178'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  // const sender = JSON.parse(payload.data.message);
  // const notificationTitle = 'New content available';
  // const notificationOptions = {
  //   body: payload.data.alert,
  //   icon: sender.data.entities.sender.entity.avatar,
  // }
  // return self.registration.showNotification(
  //   notificationTitle,
  //   notificationOptions,
  // )
})