const Playlist = require('../models/Playlist');

const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAnyPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    await playlist.deleteOne();

    res.json({ message: 'Playlist deleted by admin' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPlaylists,
  deleteAnyPlaylist,
};