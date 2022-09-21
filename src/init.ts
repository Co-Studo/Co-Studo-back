/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import app from './app';
import './db';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ EXPRESS server is listening on ${PORT}`);
});
