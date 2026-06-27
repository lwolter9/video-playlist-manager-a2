class ValidationHandler {
  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(req) {
    if (this.nextHandler) {
      return this.nextHandler.handle(req);
    }

    return null;
  }
}

class PlaylistTitleValidation extends ValidationHandler {
  handle(req) {
    if (!req.body.title) {
      return 'Playlist title is required';
    }

    return super.handle(req);
  }
}

class VideoValidation extends ValidationHandler {
  handle(req) {
    if (
      req.body.url !== undefined &&
      (!req.body.title || !req.body.url)
    ) {
      return 'Video title and URL are required';
    }

    return super.handle(req);
  }
}

const buildValidationChain = () => {
  const titleValidation = new PlaylistTitleValidation();
  const videoValidation = new VideoValidation();

  titleValidation.setNext(videoValidation);

  return titleValidation;
};

module.exports = {
  buildValidationChain,
};