//Book model defined for

const mongoose = require('mongoose');

const Book = mongoose.model(
  "Book" ,
  new mongoose.Schema({
  title: String,
  author: String,
  text: String,
  price: Number,
  updated_at: { type: Date, default: Date.now },
  })

);

module.exports = Book;



