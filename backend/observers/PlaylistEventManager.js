86% of storage used … If you run out, you can't create, edit, and upload files. Get 30 GB for ₹15 for 3 months ₹59.
1
100%
const NotificationObserver = require('./NotificationObserver');

class PlaylistEventManager {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  async notify(userId, message) {
    await Promise.all(
      this.observers.map((observer) => observer.update(userId, message))
    );
  }
}

const playlistEventManager = new PlaylistEventManager();

playlistEventManager.subscribe(NotificationObserver);

module.exports = playlistEventManager;