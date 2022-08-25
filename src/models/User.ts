import mongoose, { Document } from 'mongoose';

interface IUser extends Document<string> {
  email: string;
  nickname: string;
  avatartUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema({
  email: String,
  nickname: String,
  avatarUrl: String,
  createdAt: Date,
  updatedAt: Date,
});

const model = mongoose.model<IUser>('User', userSchema);

export default model;
