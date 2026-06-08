const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  getPlaylists,
  createPlaylist,
  getPlaylistById,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} = require('../controllers/playlistController');

router.route('/').get(protect, getPlaylists).post(protect, createPlaylist);

router
  .route('/:id')
  .get(protect, getPlaylistById)
  .delete(protect, deletePlaylist);

router.route('/:id/videos').post(protect, addVideoToPlaylist);

router.route('/:playlistId/videos/:videoId').delete(protect, removeVideoFromPlaylist);

module.exports = router;