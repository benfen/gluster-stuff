var express = require('express');
var router = express.Router();

const fs = require("fs");
const path = require("path");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

router.get('/', (req, res, next) => {

  const dir = path.resolve('.');

  fs.readdir('.', (err, files) => {
    res.render('index', { path: dir, files: files });
  })


});

router.post('/', upload.single('file'), async (req, res, next) => {

  // fs.writeFile("./test", req.file, function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
    res.redirect("/");
  // });
});

module.exports = router;
