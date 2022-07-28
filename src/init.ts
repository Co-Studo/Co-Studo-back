import app from './app';
import './db';
import './models';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ EXPRESS server is listening on ${PORT}`);
});
