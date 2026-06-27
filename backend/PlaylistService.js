const Playlist = require('../models/Playlist');
const PlaylistQueryStrategy = require('../strategies/PlaylistQueryStrategy');
const { getTemplate } = require('../prototypes/PlaylistTemplatePrototype');
const playlistEventManager = require('../observers/PlaylistEventManager');

class PlaylistService {
  async getUserPlaylists(userId, query = {}) {
    const filter = PlaylistQueryStrategy.buildFilter(userId, query);
    const sort = PlaylistQueryStrategy.buildSort(query);

    let playlists = await Playlist.find(filter).sort(sort);

    if (query.sort === 'videoCount') {
      playlists = playlists.sort(
        (a, b) => (b.videos?.length || 0) - (a.videos?.length || 0)
      );
    }

    return playlists;
  }

  async createPlaylist(userId, playlistData) {
    const { title, description, category } = playlistData;

    if (!title) {
      const error = new Error('Playlist title is required');
      error.statusCode = 400;
      throw error;
    }

    const playlist = await Playlist.create({
      title,
      description,
      category: category || 'general',
      userId,
      videos: [],
    });

    await playlistEventManager.notify(
      userId,
      `Playlist "${playlist.title}" was created.`
    );

    return playlist;
  }

  async createPlaylistFromTemplate(userId, templateType) {
    const template = getTemplate(templateType);

    if (!template) {
      const error = new Error('Playlist template not found');
      error.statusCode = 404;
      throw error;
    }

    const playlistData = template.clone(userId);

    const playlist = await Playlist.create(playlistData);

    await playlistEventManager.notify(
      userId,
      `Playlist "${playlist.title}" was created from a template.`
    );

    return playlist;
  }

  async getPlaylistById(userId, playlistId) {
    const playlist = await Playlist.findOne({
      _id: playlistId,
      userId,
    });

    if (!playlist) {
      const error = new Error('Playlist not found');
      error.statusCode = 404;
      throw error;
    }

    return playlist;
  }

  async updatePlaylist(userId, playlistId, playlistData) {
    const playlist = await this.getPlaylistById(userId, playlistId);

    const { title, description, category } = playlistData;

    if (title !== undefined) {
      playlist.title = title;
    }

    if (description !== undefined) {
      playlist.description = description;
    }

    if (category !== undefined) {
      playlist.category = category;
    }

    const updatedPlaylist = await playlist.save();

    await playlistEventManager.notify(
      userId,
      `Playlist "${updatedPlaylist.title}" was updated.`
    );

    return updatedPlaylist;
  }

  async deletePlaylist(userId, playlistId) {
    const playlist = await this.getPlaylistById(userId, playlistId);

    const playlistTitle = playlist.title;

    await playlist.deleteOne();

    await playlistEventManager.notify(
      userId,
      `Playlist "${playlistTitle}" was deleted.`
    );

    return { message: 'Playlist deleted' };
  }

  async addVideoToPlaylist(userId, playlistId, videoData) {
    const { title, url } = videoData;

    if (!title || !url) {
      const error = new Error('Video title and URL are required');
      error.statusCode = 400;
      throw error;
    }

    const playlist = await this.getPlaylistById(userId, playlistId);

    playlist.videos.push({ title, url });

    const updatedPlaylist = await playlist.save();

    await playlistEventManager.notify(
      userId,
      `Video "${title}" was added to playlist "${playlist.title}".`
    );

    return updatedPlaylist;
  }

  async removeVideoFromPlaylist(userId, playlistId, videoId) {
    const playlist = await this.getPlaylistById(userId, playlistId);

    const removedVideo = playlist.videos.find(
      (video) => video._id.toString() === videoId
    );

    playlist.videos = playlist.videos.filter(
      (video) => video._id.toString() !== videoId
    );

    const updatedPlaylist = await playlist.save();

    await playlistEventManager.notify(
      userId,
      `Video "${removedVideo?.title || 'Unknown'}" was removed from playlist "${playlist.title}".`
    );

    return updatedPlaylist;
  }
}

module.exports = new PlaylistService();