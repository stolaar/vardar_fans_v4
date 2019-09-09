interface User {
  id?: string;
  name?: string;
  username: string;
  password?: string;
  confirmPassword?: string;
  userID: number;
  role?: string;
  hasPaid?: boolean;
}
export default User;
