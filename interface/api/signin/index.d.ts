interface User {
  email: string;
  username: string;
  createdAt: string;
  password: string;
  refreshTokens: {
    hash: string;
    expiry: string;
  };
}
