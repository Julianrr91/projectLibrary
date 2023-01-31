/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const Book = require ('../models/book');

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      Book.find()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((error) => {
        res.status(200).send(error.message);
      });
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        return res.status(200).send('missing required field title');
      }

      const book = {
        title: title,
        comments: [],
      };

      Book.create(book)
        .then((doc) => {
          res.status(200).send({ title: doc.title, _id: doc._id });
        })
        .catch(() => {
          res.status(200).send('error posting book');
        });
      
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      Book.deleteMany({})
      .then((doc) =>{
        res.status(200).send('complete delete successful');
      })
      .catch(()=>{
        res.status(200).send('error deleting books');
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      Book.findById(bookid)
      .then((doc) =>{
        if(!doc){
          return res.status(200).send('no book exists');
        }
        res.status(200).send(doc);
      })
      .catch(()=>{
        res.status(200).send('error getting book');
      })
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if(!comment){
        return res.status(200).send('missing required field comment');
      }

      Book.findById(bookid)
      .then((doc) =>{
        doc.comments = doc.comments.concat(comment);
        doc.commentcount = doc.commentcount + 1;

        doc.save()
        .then((docUpdated)=>{
          res.status(200).send(docUpdated);
        })
      })
      .catch(()=>{
        res.status(200).send('no book exists');
      })
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.findById({ _id: bookid })
        .then((doc) => {
          doc.remove().then(() => {
            res.status(200).send('delete successful');
          });
        })
        .catch(() => {
          res.status(200).send('no book exists');
        });
    });
  
};
