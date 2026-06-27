const Notification = require('../models/Notification');

class NotificationObserver {
  async update(userId, message) {
    return Notification.create({
      userId,
      message,
    });
  }
}

module.exports = new NotificationObserver();