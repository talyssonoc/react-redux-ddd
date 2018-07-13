export default ({ conduitApiService }) => ({
  fromAuthInfo(userAuthInfo) {
    return this._authUser(userAuthInfo, 'users/login');
  },

  add(user) {
    return this._authUser(user, 'users');
  },

  async _authUser(user, url) {
    try {
      const { data } = await conduitApiService.post(url, { user });

      return data.user;
    } catch(ajaxError) {
      const error = this._extractErrors(ajaxError);
      throw error;
    }
  },

  _extractErrors(ajaxError) {
    const error = new Error();
    error.errors = ajaxError.response.data.errors;

    return error;
  }
});
