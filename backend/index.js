import express, { request, response } from 'express';
import { PORT } from './config.js';
import { mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import booksRoute from './routes/booksRoute.js';
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

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
