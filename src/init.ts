/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import app from './app';
import './firebaseApp';

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log(`✅ EXPRESS server is listening on ${PORT}`);
});
