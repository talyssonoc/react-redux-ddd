export default ({ articleRepository }) => async (user, { onSuccess, onError }) => {
  try {
    const userFeed = await articleRepository.fromUserFeed(user);
    onSuccess(userFeed);
  } catch(error) {
    onError(error);
  }
};
