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