const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const AdminAccessProxy = require('../proxies/AdminAccessProxy');

const {
  getAllPlaylists,
  deleteAnyPlaylist,
} = require('../controllers/adminController');

router.get(
  '/playlists',
  protect,
  AdminAccessProxy.checkAccess,
  getAllPlaylists
);

router.delete(
  '/playlists/:id',
  protect,
  AdminAccessProxy.checkAccess,
  deleteAnyPlaylist
);

module.exports = router;