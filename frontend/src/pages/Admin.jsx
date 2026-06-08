import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    const response = await axiosInstance.get('/api/admin/playlists', {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    setPlaylists(response.data);
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/api/admin/playlists/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    setPlaylists(playlists.filter((playlist) => playlist._id !== id));
  };

  useEffect(() => {
    if (user) {
      fetchPlaylists();
    }
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="mb-6 text-gray-600">
        Monitor and manage user-created playlists.
      </p>

      <div className="bg-white rounded shadow p-4">
        {playlists.map((playlist) => (
          <div
            key={playlist._id}
            className="border-b py-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{playlist.title}</h2>
              <p>{playlist.description}</p>
              <p className="text-sm text-gray-600">
                User: {playlist.userId?.email || 'Unknown'}
              </p>
              <p className="text-sm text-gray-600">
                Videos: {playlist.videos?.length || 0}
              </p>
            </div>

            <button
              onClick={() => handleDelete(playlist._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;