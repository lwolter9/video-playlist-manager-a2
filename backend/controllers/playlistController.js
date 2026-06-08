const Playlist = require('../models/Playlist');

const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPlaylist = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Playlist title is required' });
  }

  try {
    const playlist = await Playlist.create({
      title,
      description,
      userId: req.user.id,
      videos: [],
    });

    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    await playlist.deleteOne();

    res.json({ message: 'Playlist deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addVideoToPlaylist = async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({ message: 'Video title and URL are required' });
  }

  try {
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    playlist.videos.push({ title, url });
    const updatedPlaylist = await playlist.save();

    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeVideoFromPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.playlistId,
      userId: req.user.id,
    });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    playlist.videos = playlist.videos.filter(
      (video) => video._id.toString() !== req.params.videoId
    );

    const updatedPlaylist = await playlist.save();

    res.json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPlaylists,
  createPlaylist,
  getPlaylistById,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
};