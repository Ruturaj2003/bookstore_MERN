import express from 'express';
import { PORT } from './config.js';
import { mongoDBURL } from './config.js';
import mongoose from 'mongoose';
const app = express();

app.get('/', (req, res) => {
  return res.status(200).send('<h1>Get Request To Home Sucess</h1>');
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to Databse');
    app.listen(PORT, () => {
      console.log(`App is Doing Dota to port : ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
