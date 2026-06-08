import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const PlaylistList = ({ tasks, setTasks }) => {
  const { user } = useAuth();

  const authHeader = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const handleDeletePlaylist = async (id) => {
    try {
      await axiosInstance.delete(`/api/playlists/${id}`, authHeader);
      setTasks(tasks.filter((playlist) => playlist._id !== id));
    } catch {
      alert('Failed to delete playlist');
    }
  };

  const handleAddVideo = async (playlistId) => {
    const title = prompt('Video title');
    const url = prompt('Video URL');

    if (!title || !url) return;

    try {
      const response = await axiosInstance.post(
        `/api/playlists/${playlistId}/videos`,
        { title, url },
        authHeader
      );

      setTasks(
        tasks.map((playlist) =>
          playlist._id === playlistId ? response.data : playlist
        )
      );
    } catch {
      alert('Failed to add video');
    }
  };

  const handleRemoveVideo = async (playlistId, videoId) => {
    try {
      const response = await axiosInstance.delete(
        `/api/playlists/${playlistId}/videos/${videoId}`,
        authHeader
      );

      setTasks(
        tasks.map((playlist) =>
          playlist._id === playlistId ? response.data : playlist
        )
      );
    } catch {
      alert('Failed to remove video');
    }
  };

  return (
    <div>
      {tasks.map((playlist) => (
        <div key={playlist._id} className="bg-gray-100 p-4 rounded mb-4 shadow">
          <h2 className="font-bold text-xl">{playlist.title}</h2>

          <p className="mb-2">{playlist.description}</p>

          <p className="text-sm text-gray-600">
            Videos: {playlist.videos?.length || 0}
          </p>

          <div className="mt-3">
            <button
              onClick={() => handleAddVideo(playlist._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
            >
              Add Video
            </button>

            <button
              onClick={() => handleDeletePlaylist(playlist._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete Playlist
            </button>
          </div>

          <div className="mt-4">
            {playlist.videos?.map((video) => (
              <div key={video._id} className="border p-3 mt-2 rounded bg-white">
                <p className="font-semibold">{video.title}</p>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600"
                >
                  Open Video
                </a>

                <button
                  onClick={() => handleRemoveVideo(playlist._id, video._id)}
                  className="ml-3 bg-red-400 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;