const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  getAllPlaylists,
  deleteAnyPlaylist,
} = require('../controllers/adminController');

router.get('/playlists', protect, getAllPlaylists);
router.delete('/playlists/:id', protect, deleteAnyPlaylist);

module.exports = router;