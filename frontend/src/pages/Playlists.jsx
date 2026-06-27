import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import PlaylistForm from '../components/PlaylistForm';
import PlaylistList from '../components/PlaylistList';
import { useAuth } from '../context/AuthContext';

const Playlists = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    sort: 'newest',
    category: 'all',
  });

  const fetchPlaylists = async () => {
    try {
      const response = await axiosInstance.get('/api/playlists', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: filters,
      });

      setTasks(response.data);
    } catch {
      alert('Failed to fetch playlists');
    }
  };

  useEffect(() => {
    if (user) {
      fetchPlaylists();
    }
  }, [user, filters]);

  return (
    <div className="container mx-auto p-6">
      <PlaylistForm playlists={tasks} setPlaylists={setTasks} />

      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-xl font-bold mb-4">
          Search, Sort and Filter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Search by playlist title"
            value={filters.search}
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value,
              })
            }
            className="p-2 border rounded"
          />

          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters({
                ...filters,
                sort: e.target.value,
              })
            }
            className="p-2 border rounded"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Title A-Z</option>
            <option value="videoCount">Most videos</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({
                ...filters,
                category: e.target.value,
              })
            }
            className="p-2 border rounded"
          >
            <option value="all">All categories</option>
            <option value="general">General</option>
            <option value="study">Study</option>
            <option value="music">Music</option>
            <option value="fitness">Fitness</option>
            <option value="programming">Programming</option>
          </select>
        </div>
      </div>

      <PlaylistList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Playlists;