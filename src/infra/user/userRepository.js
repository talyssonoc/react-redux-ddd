export default ({ conduitApiService }) => ({
  async fromAuthInfo(userAuthInfo) {
    try {
      const { data } = await conduitApiService.post('users/login', {
        user: userAuthInfo
      });

      return data.user;
    } catch(ajaxError) {
      const error = new Error();
      error.errors = ajaxError.response.data.errors;

      throw error;
    }
  }
});
