const { expect } = require('chai');
const sinon = require('sinon');

const Playlist = require('../models/Playlist');
const playlistEventManager = require('../observers/PlaylistEventManager');
const PlaylistService = require('../services/PlaylistService');

describe('PlaylistService Unit Tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should create a playlist and trigger notification observer', async () => {
    const fakePlaylist = {
      title: 'Study Playlist',
      description: 'Study videos',
      category: 'study',
      userId: 'user123',
      videos: [],
    };

    const createStub = sinon.stub(Playlist, 'create').resolves(fakePlaylist);
    const notifyStub = sinon.stub(playlistEventManager, 'notify').resolves();

    const result = await PlaylistService.createPlaylist('user123', {
      title: 'Study Playlist',
      description: 'Study videos',
      category: 'study',
    });

    expect(createStub.calledOnce).to.equal(true);
    expect(notifyStub.calledOnce).to.equal(true);
    expect(result.title).to.equal('Study Playlist');
  });

  it('should reject playlist creation without title', async () => {
    try {
      await PlaylistService.createPlaylist('user123', {
        description: 'Missing title',
      });

      throw new Error('Test should have thrown validation error');
    } catch (error) {
      expect(error.message).to.equal('Playlist title is required');
      expect(error.statusCode).to.equal(400);
    }
  });

  it('should update playlist details', async () => {
    const fakePlaylist = {
      title: 'Old Title',
      description: 'Old Description',
      category: 'general',
      save: sinon.stub().resolvesThis(),
    };

    sinon.stub(PlaylistService, 'getPlaylistById').resolves(fakePlaylist);
    const notifyStub = sinon.stub(playlistEventManager, 'notify').resolves();

    const result = await PlaylistService.updatePlaylist('user123', 'playlist123', {
      title: 'New Title',
      description: 'New Description',
      category: 'study',
    });

    expect(result.title).to.equal('New Title');
    expect(result.description).to.equal('New Description');
    expect(result.category).to.equal('study');
    expect(notifyStub.calledOnce).to.equal(true);
  });

  it('should delete a playlist and return confirmation message', async () => {
    const fakePlaylist = {
      title: 'Delete Me',
      deleteOne: sinon.stub().resolves(),
    };

    sinon.stub(PlaylistService, 'getPlaylistById').resolves(fakePlaylist);
    const notifyStub = sinon.stub(playlistEventManager, 'notify').resolves();

    const result = await PlaylistService.deletePlaylist('user123', 'playlist123');

    expect(fakePlaylist.deleteOne.calledOnce).to.equal(true);
    expect(notifyStub.calledOnce).to.equal(true);
    expect(result.message).to.equal('Playlist deleted');
  });

  it('should add a video to a playlist', async () => {
    const fakePlaylist = {
      title: 'Video Playlist',
      videos: [],
      save: sinon.stub().resolvesThis(),
    };

    sinon.stub(PlaylistService, 'getPlaylistById').resolves(fakePlaylist);
    const notifyStub = sinon.stub(playlistEventManager, 'notify').resolves();

    const result = await PlaylistService.addVideoToPlaylist('user123', 'playlist123', {
      title: 'Video 1',
      url: 'https://example.com',
    });

    expect(result.videos.length).to.equal(1);
    expect(result.videos[0].title).to.equal('Video 1');
    expect(notifyStub.calledOnce).to.equal(true);
  });

  it('should reject adding a video without title or URL', async () => {
    try {
      await PlaylistService.addVideoToPlaylist('user123', 'playlist123', {
        title: '',
        url: '',
      });

      throw new Error('Test should have thrown validation error');
    } catch (error) {
      expect(error.message).to.equal('Video title and URL are required');
      expect(error.statusCode).to.equal(400);
    }
  });
});