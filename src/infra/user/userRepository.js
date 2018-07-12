export default ({ conduitApiService }) => ({
  async fromAuthInfo(userAuthInfo) {
    try {
      const response = await conduitApiService.post('users/login', {
        user: userAuthInfo
      });

      return response.user;
    } catch(ajaxError) {
      const error = new Error();
      error.errors = ajaxError.response.data.errors;

      throw error;
    }
  }
});
