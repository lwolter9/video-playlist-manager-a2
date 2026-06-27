import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const PlaylistForm = ({ playlists, setPlaylists }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
  });

  const handleTemplateCreate = async (templateType) => {
    try {
      const response = await axiosInstance.post(
        `/api/playlists/templates/${templateType}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setPlaylists([...playlists, response.data]);
    } catch {
      alert('Failed to create playlist from template');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/api/playlists', formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setPlaylists([...playlists, response.data]);

      setFormData({
        title: '',
        description: '',
        category: 'general',
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
      <div className="mb-6">
        <h2 className="font-semibold mb-2">
          Create from Template
        </h2>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleTemplateCreate('study')}
            className="bg-purple-600 text-white px-3 py-2 rounded"
          >
            Study Template
          </button>

          <button
            type="button"
            onClick={() => handleTemplateCreate('programming')}
            className="bg-green-600 text-white px-3 py-2 rounded"
          >
            Programming Template
          </button>

          <button
            type="button"
            onClick={() => handleTemplateCreate('fitness')}
            className="bg-orange-600 text-white px-3 py-2 rounded"
          >
            Fitness Template
          </button>

          <button
            type="button"
            onClick={() => handleTemplateCreate('music')}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Music Template
          </button>
        </div>
      </div>
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

      <select
        value={formData.category}
        onChange={(e) =>
          setFormData({
            ...formData,
            category: e.target.value,
          })
        }
        className="w-full p-2 border rounded mb-4"
      >
        <option value="general">General</option>
        <option value="study">Study</option>
        <option value="music">Music</option>
        <option value="fitness">Fitness</option>
        <option value="programming">Programming</option>
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Playlist
      </button>
    </form>
  );
};

export default PlaylistForm;