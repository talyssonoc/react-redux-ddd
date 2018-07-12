export default ({ userRepository }) => async (userAuthInfo, { onSuccess, onError }) => {
  try {
    const authorizedUser = await userRepository.fromAuthInfo(userAuthInfo);

    return onSuccess(authorizedUser);
  } catch(error) {
    return onError(error);
  }
}
