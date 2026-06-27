const { expect } = require('chai');
const sinon = require('sinon');

const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { protect, adminOnly } = require('../middleware/authMiddleware');

describe('Authentication Middleware Tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should reject request with no token', async () => {
    const req = {
      headers: {},
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await protect(req, res);

    expect(res.status.calledWith(401)).to.equal(true);
  });

  it('should attach user when token is valid', async () => {
    const req = {
      headers: {
        authorization: 'Bearer token123',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.spy();

    sinon.stub(jwt, 'verify').returns({
      id: 'user123',
    });

    sinon.stub(User, 'findById').returns({
      select: sinon.stub().resolves({
        _id: 'user123',
        role: 'user',
      }),
    });

    await protect(req, res, next);

    expect(next.calledOnce).to.equal(true);
    expect(req.user.role).to.equal('user');
  });

  it('should allow admin user through adminOnly', () => {
    const req = {
      user: {
        role: 'admin',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.spy();

    adminOnly(req, res, next);

    expect(next.calledOnce).to.equal(true);
  });

  it('should block non-admin users', () => {
    const req = {
      user: {
        role: 'user',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.spy();

    adminOnly(req, res, next);

    expect(res.status.calledWith(403)).to.equal(true);
    expect(next.called).to.equal(false);
  });
});