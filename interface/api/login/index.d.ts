interface User {
  email: string;
  username: string;
  createdAt: string;
  password?: string;
  name?: string;
  image?: string;
  refreshTokenHash?: string;
}
