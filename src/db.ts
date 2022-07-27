import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const init = () => {
  try {
    const uri = process.env.MONGO_URL;

    if (!uri) {
      throw Error('Failed load process.env.MONGO_URL');
    }

    mongoose.connect(uri);

    const db = mongoose.connection;

    const handleOpen = () => console.log('✅ Connected to DB');
    const handleError = (error: Error) => {
      throw Error(error.message);
    };

    db.once('open', handleOpen);
    db.on('error', handleError);
  } catch (error) {
    console.log(`❌ Error on DB Connection:${error}`);
  }
};

init();
