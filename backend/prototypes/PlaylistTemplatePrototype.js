86% of storage used … If you run out, you can't create, edit, and upload files. Get 30 GB for ₹15 for 3 months ₹59.
1
100%
class PlaylistTemplatePrototype {
  constructor(title, description, category, videos = []) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.videos = videos;
  }

  clone(userId) {
    return {
      title: this.title,
      description: this.description,
      category: this.category,
      videos: [...this.videos],
      userId,
    };
  }
}

const templates = {
  study: new PlaylistTemplatePrototype(
    'Study Playlist',
    'Template for lectures, tutorials and study resources.',
    'study',
    []
  ),

  programming: new PlaylistTemplatePrototype(
    'Programming Playlist',
    'Template for coding tutorials and technical learning videos.',
    'programming',
    []
  ),

  fitness: new PlaylistTemplatePrototype(
    'Fitness Playlist',
    'Template for workout, mobility and fitness videos.',
    'fitness',
    []
  ),

  music: new PlaylistTemplatePrototype(
    'Music Playlist',
    'Template for music, playlists and entertainment videos.',
    'music',
    []
  ),
};

const getTemplate = (templateType) => {
  return templates[templateType];
};

module.exports = {
  getTemplate,
};