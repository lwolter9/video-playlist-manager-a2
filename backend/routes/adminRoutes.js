const express = require('express');
const router = express.Router();

const {
  protect,
  adminOnly,
} = require('../middleware/authMiddleware');

const {
  getAllPlaylists,
  deleteAnyPlaylist,
} = require('../controllers/adminController');

router.get('/playlists', protect, adminOnly, getAllPlaylists);

router.delete('/playlists/:id', protect, adminOnly, deleteAnyPlaylist);

module.exports = router;