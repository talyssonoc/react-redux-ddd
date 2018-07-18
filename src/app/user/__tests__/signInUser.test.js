import makeSignInUser from '../signInUser';

describe('App :: User :: signInUser', () => {
  let signInUser;
  let mockUserRepository;

  it('passes the user auth info to the repository', async () => {
    mockUserRepository = {
      fromAuthInfo: jest.fn()
    };

    signInUser = makeSignInUser({
      userRepository: mockUserRepository
    });

    const onSuccess = () => {};
    const onError = () => {};

    await signInUser('userAuthInfo', { onSuccess, onError });

    expect(mockUserRepository.fromAuthInfo).toBeCalledWith('userAuthInfo');
  });

  describe('when it succeeds', () => {
    beforeEach(() => {
      mockUserRepository = {
        fromAuthInfo: jest.fn().mockReturnValue('signedInUser')
      };

      signInUser = makeSignInUser({
        userRepository: mockUserRepository
      });
    });

    it('calls onSuccess callback with the signed in user', async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();

      await signInUser('userAuthInfo', { onSuccess, onError });

      expect(onSuccess).toBeCalledWith('signedInUser');
      expect(onError).not.toBeCalled();
    });
  });

  describe('when it fails', () => {
    beforeEach(() => {
      mockUserRepository = {
        fromAuthInfo: jest.fn().mockImplementation(() => {
          throw new Error('Nop!')
        })
      };

      signInUser = makeSignInUser({
        userRepository: mockUserRepository
      });
    });

    it('calls onError callback with the error', async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();

      await signInUser('userAuthInfo', { onSuccess, onError });

      expect(onError).toBeCalledWith(new Error('Nop!'));
      expect(onSuccess).not.toBeCalled();
    });
  });
});