import express, { request, response } from 'express';
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
    resp.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    resp.status(500).send({ message: error.message });
  }
});

app.get('/books', async (req, resp) => {
  try {
    const books = await Book.find({});
    return resp.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    resp.status(500).send({ message: error.message });
  }
});

app.get('/books/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return resp.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    resp.status(500).send({ message: error.message });
  }
});

app.put('/books/:id', async (request, response) => {
  const { id } = request.params;
  const { body } = request;
  try {
    const result = await Book.findByIdAndUpdate(id, body);
    if (!result) {
      response.status(404).send({
        message: 'Book not found',
      });
      return;
    }
    response.status(200).send('Updated Sucessfuly');
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

app.delete('/books/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const result = await Book.findByIdAndDelete(id);
    response.status(200).send('Book Deleted Sucessfully');
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
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
