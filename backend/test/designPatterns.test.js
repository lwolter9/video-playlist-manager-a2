const { expect } = require('chai');

const UserFactory = require('../factories/UserFactory');
const PlaylistQueryStrategy = require('../strategies/PlaylistQueryStrategy');
const { getTemplate } = require('../prototypes/PlaylistTemplatePrototype');

describe('Design Pattern Unit Tests', () => {
  describe('Factory Pattern - UserFactory', () => {
    it('should create a normal user object', () => {
      const user = UserFactory.createUser({
        name: 'Test User',
        email: 'user@test.com',
        password: 'password123',
      });

      expect(user.role).to.equal('user');
      expect(user.email).to.equal('user@test.com');
    });

    it('should create an admin user object', () => {
      const admin = UserFactory.createAdmin({
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'password123',
      });

      expect(admin.role).to.equal('admin');
      expect(admin.email).to.equal('admin@test.com');
    });
  });

  describe('Strategy Pattern - PlaylistQueryStrategy', () => {
    it('should build a search filter for playlist title', () => {
      const filter = PlaylistQueryStrategy.buildFilter('user123', {
        search: 'study',
      });

      expect(filter.userId).to.equal('user123');
      expect(filter.title.$regex).to.equal('study');
      expect(filter.title.$options).to.equal('i');
    });

    it('should build a category filter', () => {
      const filter = PlaylistQueryStrategy.buildFilter('user123', {
        category: 'programming',
      });

      expect(filter.userId).to.equal('user123');
      expect(filter.category).to.equal('programming');
    });

    it('should build title sort strategy', () => {
      const sort = PlaylistQueryStrategy.buildSort({
        sort: 'title',
      });

      expect(sort).to.deep.equal({ title: 1 });
    });

    it('should default to newest sort strategy', () => {
      const sort = PlaylistQueryStrategy.buildSort({});

      expect(sort).to.deep.equal({ createdAt: -1 });
    });
  });

  describe('Prototype Pattern - PlaylistTemplatePrototype', () => {
    it('should clone the study template for a user', () => {
      const template = getTemplate('study');
      const playlist = template.clone('user123');

      expect(playlist.title).to.equal('Study Playlist');
      expect(playlist.category).to.equal('study');
      expect(playlist.userId).to.equal('user123');
      expect(playlist.videos).to.be.an('array');
    });

    it('should return undefined for an invalid template', () => {
      const template = getTemplate('invalid');

      expect(template).to.equal(undefined);
    });
  });
});