import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const createUser = async (name: string, email: string, password: string) => {
  const existing = await UserModel.findOne({ email });
  if (existing) throw { status: 422, message: 'E-mail já cadastrado' };

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = new UserModel({ name, email, password: hash });
  await user.save();
  return user;
};

export const findUserByEmail = async (email: string, includePassword = false) => {
  return includePassword
    ? UserModel.findOne({ email }).select('+password')
    : UserModel.findOne({ email });
};

export const comparePassword = async (plain: string, hash: string) => {
  return bcrypt.compare(plain, hash);
};
