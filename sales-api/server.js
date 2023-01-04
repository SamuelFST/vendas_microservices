import app from './app.js';

const env = process.env;
const PORT = env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
