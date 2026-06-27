86% of storage used … If you run out, you can't create, edit, and upload files. Get 30 GB for ₹15 for 3 months ₹59.
1
100%
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Playlists from './pages/Playlists';
import Admin from './pages/Admin';
import { useAuth } from './context/AuthContext';
import Notifications from './pages/Notifications';

function App() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? '/playlists' : '/login'} />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />

        <Route
          path="/playlists"
          element={user ? <Playlists /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin"
          element={user && isAdmin ? (<Admin />) : (<Navigate to={user ? '/playlists' : '/login'} />)}
        />

        <Route
          path="/notifications"
          element={user ? <Notifications /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;