const PlaylistService = require('../services/PlaylistService');
const { buildValidationChain } = require('../chains/RequestValidationChain');

const handleError = (error, res) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message: error.message });
};

const validateRequest = (req, res) => {
  const validationChain = buildValidationChain();
  const validationError = validationChain.handle(req);

  if (validationError) {
    res.status(400).json({ message: validationError });
    return false;
  }

  return true;
};

const getPlaylists = async (req, res) => {
  try {
    const playlists = await PlaylistService.getUserPlaylists(
      req.user.id,
      req.query
    );

    res.json(playlists);
  } catch (error) {
    handleError(error, res);
  }
};

const createPlaylist = async (req, res) => {
  if (!validateRequest(req, res)) return;

  try {
    const playlist = await PlaylistService.createPlaylist(req.user.id, req.body);
    res.status(201).json(playlist);
  } catch (error) {
    handleError(error, res);
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const playlist = await PlaylistService.getPlaylistById(
      req.user.id,
      req.params.id
    );

    res.json(playlist);
  } catch (error) {
    handleError(error, res);
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const updatedPlaylist = await PlaylistService.updatePlaylist(
      req.user.id,
      req.params.id,
      req.body
    );

    res.json(updatedPlaylist);
  } catch (error) {
    handleError(error, res);
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const result = await PlaylistService.deletePlaylist(
      req.user.id,
      req.params.id
    );

    res.json(result);
  } catch (error) {
    handleError(error, res);
  }
};

const addVideoToPlaylist = async (req, res) => {
  if (!validateRequest(req, res)) return;

  try {
    const updatedPlaylist = await PlaylistService.addVideoToPlaylist(
      req.user.id,
      req.params.id,
      req.body
    );

    res.status(200).json(updatedPlaylist);
  } catch (error) {
    handleError(error, res);
  }
};

const removeVideoFromPlaylist = async (req, res) => {
  try {
    const updatedPlaylist = await PlaylistService.removeVideoFromPlaylist(
      req.user.id,
      req.params.playlistId,
      req.params.videoId
    );

    res.json(updatedPlaylist);
  } catch (error) {
    handleError(error, res);
  }
};

const createPlaylistFromTemplate = async (req, res) => {
  try {
    const playlist = await PlaylistService.createPlaylistFromTemplate(
      req.user.id,
      req.params.templateType
    );

    res.status(201).json(playlist);
  } catch (error) {
    handleError(error, res);
  }
};

module.exports = {
  getPlaylists,
  createPlaylist,
  createPlaylistFromTemplate,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
};