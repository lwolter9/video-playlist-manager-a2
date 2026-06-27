class PlaylistQueryStrategy {
  static buildFilter(userId, query = {}) {
    const filter = { userId };

    if (query.search) {
      filter.title = {
        $regex: query.search,
        $options: 'i',
      };
    }

    if (query.category && query.category !== 'all') {
      filter.category = query.category;
    }

    return filter;
  }

  static buildSort(query = {}) {
    switch (query.sort) {
      case 'title':
        return { title: 1 };

      case 'videoCount':
        return { videoCount: -1 };

      case 'oldest':
        return { createdAt: 1 };

      case 'newest':
      default:
        return { createdAt: -1 };
    }
  }
}

module.exports = PlaylistQueryStrategy;