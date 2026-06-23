const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  getPlaylists,
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  createPlaylistFromTemplate,
} = require('../controllers/playlistController');

router.route('/').get(protect, getPlaylists).post(protect, createPlaylist);

router.route('/templates/:templateType').post(protect, createPlaylistFromTemplate);

router
  .route('/:id')
  .get(protect, getPlaylistById)
  .put(protect, updatePlaylist)
  .delete(protect, deletePlaylist);

router.route('/:id/videos').post(protect, addVideoToPlaylist);

router.route('/:playlistId/videos/:videoId').delete(protect, removeVideoFromPlaylist);

module.exports = router;