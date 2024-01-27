import express, { request, response } from 'express';
import { PORT } from './config.js';
import { mongoDBURL } from './config.js';
import mongoose from 'mongoose';

import booksRoute from './routes/booksRoute.js';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send('<h1>Get Request To Home Sucess</h1>');
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to Databse');
    app.listen(PORT, () => {
      console.log(`App is Doing Dota to port : ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
