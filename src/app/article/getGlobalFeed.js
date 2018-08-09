export default ({ articleRepository }) => async ({ onSuccess, onError }) => {
  try {
    const globalFeed = await articleRepository.fromGlobalFeed();
    onSuccess(globalFeed);
  } catch(error) {
    onError(error);
  }
};
