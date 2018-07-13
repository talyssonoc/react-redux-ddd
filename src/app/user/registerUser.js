export default ({ userRepository }) => async (userInfo, { onSuccess, onError }) => {
  try {
    const newUser = await userRepository.add(userInfo);

    return onSuccess(newUser);
  } catch(error) {
    return onError(error);
  }
}
