export interface CreateUserTokenInitialize {
    data: {
      appId: string | undefined;
      userToken: string | undefined;
      encryptionKey: string | undefined;
      challengeId: string | undefined;
    }
  }