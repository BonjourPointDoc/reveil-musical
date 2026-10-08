
import "reflect-metadata";
import express from 'express';
require('dotenv').config();

const app = express();
app.use(express.json());

// Impl. later

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
