import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nickname: String,
  avatarUrl: String,
  createdAt: Date,
  updatedAt: Date,
});

const model = mongoose.model('User', userSchema);

export default model;
