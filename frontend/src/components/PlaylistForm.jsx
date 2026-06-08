import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const PlaylistForm = ({ playlists, setPlaylists }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axiosInstance.post(
        '/api/playlists',
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setPlaylists([...playlists, response.data]);

      setFormData({
        title: '',
        description: '',
      });

    } catch {

      alert('Failed to create playlist');

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow rounded mb-6"
    >

      <h1 className="text-2xl font-bold mb-4">
        Create Playlist
      </h1>

      <input
        placeholder="Playlist Name"
        value={formData.title}
        onChange={(e) =>
          setFormData({
            ...formData,
            title: e.target.value,
          })
        }
        className="w-full p-2 border rounded mb-4"
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
        className="w-full p-2 border rounded mb-4"
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Playlist
      </button>

    </form>

  );

};

export default PlaylistForm;