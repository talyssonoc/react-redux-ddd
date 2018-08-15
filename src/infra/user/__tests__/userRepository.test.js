import makeUserRepository from '../userRepository';

describe('Infra :: User :: userRepository', () => {
  let userRepository;
  let conduitApiService;
  const successResponse = Promise.resolve({ data: { user: 'user' }});
  const failedResponse = Promise.reject({
    errors: ['fail', 'boom']
  });

  describe('#fromAuthInfo', () => {
    it('uses conduitApiService to make the request', async () => {
      conduitApiService = {
        post: jest.fn().mockReturnValue(successResponse)
      };

      userRepository = makeUserRepository({ conduitApiService });

      await userRepository.fromAuthInfo('userAuthInfo');

      expect(conduitApiService.post).toBeCalledWith('users/login', { user: 'userAuthInfo' });
    });

    describe('when the request succeeds', () => {
      beforeEach(() => {
        conduitApiService = {
          post: jest.fn().mockReturnValue(successResponse)
        };

        userRepository = makeUserRepository({ conduitApiService });
      });

      it('resolves with the authorized user', () => {
        expect(userRepository.fromAuthInfo('userAuthInfo'))
          .resolves.toEqual('user');
      });
    });

    describe('when the request fails', () => {
      beforeEach(() => {
        conduitApiService = {
          post: jest.fn().mockReturnValue(failedResponse)
        };

        userRepository = makeUserRepository({ conduitApiService });
      });

      it('rejects with the errors', () => {
        expect(userRepository.fromAuthInfo('userAuthInfo'))
          .rejects.toMatchObject({
            errors: ['fail', 'boom']
          });
      });
    });
  });

  describe('#add', () => {
    it('uses conduitApiService to make the request', async () => {
      conduitApiService = {
        post: jest.fn().mockReturnValue(successResponse)
      };

      userRepository = makeUserRepository({ conduitApiService });

      await userRepository.add('userData');

      expect(conduitApiService.post).toBeCalledWith('users', { user: 'userData' });
    });

    describe('when the request succeeds', () => {
      beforeEach(() => {
        conduitApiService = {
          post: jest.fn().mockReturnValue(successResponse)
        };

        userRepository = makeUserRepository({ conduitApiService });
      });

      it('resolves with the authorized user', () => {
        expect(userRepository.add('userData'))
          .resolves.toEqual('user');
      });
    });

    describe('when the request fails', () => {
      beforeEach(() => {
        conduitApiService = {
          post: jest.fn().mockReturnValue(failedResponse)
        };

        userRepository = makeUserRepository({ conduitApiService });
      });

      it('rejects with the errors', () => {
        expect(userRepository.add('userData'))
          .rejects.toMatchObject({
            errors: ['fail', 'boom']
          });
      });
    });
  });
});
