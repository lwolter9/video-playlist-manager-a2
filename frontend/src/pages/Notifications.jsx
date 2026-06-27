import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  const authHeader = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get('/api/notifications', authHeader);
      setNotifications(response.data);
    } catch {
      alert('Failed to fetch notifications');
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await axiosInstance.put(
        `/api/notifications/${id}/read`,
        {},
        authHeader
      );

      setNotifications(
        notifications.map((notification) =>
          notification._id === id ? response.data : notification
        )
      );
    } catch {
      alert('Failed to update notification');
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>

        {notifications.length === 0 ? (
          <p>No notifications yet.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`border p-4 rounded mb-3 ${
                notification.read ? 'bg-gray-100' : 'bg-blue-50'
              }`}
            >
              <p className="font-medium">{notification.message}</p>

              <p className="text-sm text-gray-600">
                {new Date(notification.createdAt).toLocaleString()}
              </p>

              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification._id)}
                  className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;