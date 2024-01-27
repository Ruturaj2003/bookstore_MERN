import express from 'express';
import { PORT } from './config.js';
import { mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send('<h1>Get Request To Home Sucess</h1>');
});

app.post('/books', async (req, resp) => {
  const { body } = req;
  try {
    if (!body.title || !body.author || !body.publishYear) {
      return resp.status(400).send({
        message: 'Send All The required Fields',
      });
    }

    const newBook = {
      title: body.title,
      author: body.author,
      publishYear: body.publishYear,
    };
    const book = await Book.create(newBook);
    return resp.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    resp.status(500).send({ message: error.message });
  }
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
