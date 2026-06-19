class UserFactory {
  static createUser(userData) {
    return {
      ...userData,
      role: 'user',
    };
  }

  static createAdmin(userData) {
    return {
      ...userData,
      role: 'admin',
    };
  }
}

module.exports = UserFactory;