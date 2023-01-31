const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comments: { type: Array },
  commentcount: { type: Number, default: 0},
});

BookSchema.methods.toJSON = function() {
    const { __v, ...book  } = this.toObject();
    return book;
}

module.exports = mongoose.model('Book', BookSchema);