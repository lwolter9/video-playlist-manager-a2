86% of storage used … If you run out, you can't create, edit, and upload files. Get 30 GB for ₹15 for 3 months ₹59.
1
100%
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