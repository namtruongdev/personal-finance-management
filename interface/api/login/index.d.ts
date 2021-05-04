interface User {
  [x: string]: { dutoan: { thunhap: [] } };
  email: string;
  username: string;
  createdAt: string;
  password?: string;
  name?: string;
  image?: string;
  refreshTokenHash?: string;
}
