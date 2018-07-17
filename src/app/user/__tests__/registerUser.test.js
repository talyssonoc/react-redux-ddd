import makeRegisterUser from '../registerUser';

describe('App :: User :: registerUser', () => {
  let registerUser;
  let mockUserRepository;

  it('passes the user data to the repository', async () => {
    mockUserRepository = {
      add: jest.fn()
    };

    registerUser = makeRegisterUser({
      userRepository: mockUserRepository
    });

    const onSuccess = () => {};
    const onError = () => {};

    await registerUser('userData', { onSuccess, onError });

    expect(mockUserRepository.add).toBeCalledWith('userData');
  });

  describe('when it succeeds', () => {
    beforeEach(() => {
      mockUserRepository = {
        add: jest.fn().mockReturnValue('newUser')
      };

      registerUser = makeRegisterUser({
        userRepository: mockUserRepository
      });
    });

    it('calls onSuccess callback with the new user', async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();

      await registerUser('userData', { onSuccess, onError });

      expect(onSuccess).toBeCalledWith('newUser');
      expect(onError).not.toBeCalled();
    });
  });

  describe('when it fails', () => {
    beforeEach(() => {
      mockUserRepository = {
        add: jest.fn().mockImplementation(() => {
          throw new Error('Nop!')
        })
      };

      registerUser = makeRegisterUser({
        userRepository: mockUserRepository
      });
    });

    it('calls onError callback with the error', async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();

      await registerUser('userData', { onSuccess, onError });

      expect(onError).toBeCalledWith(new Error('Nop!'));
      expect(onSuccess).not.toBeCalled();
    });
  });
});