var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var books_read = [];
  res.render('index', { books_read: books_read });
});

router.post('/get-data', async (req, res) => {
  console.log("POST");
  console.log((req.body).read_books);
  books_read = JSON.parse((req.body).read_books);
  console.log(books_read[0].cover)

  res.render('index', { books_read: books_read });
  
});

module.exports = router;