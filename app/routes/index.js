const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');
const multer  = require('multer')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR || './uploads')
  },
  filename:(req, file, cb) => {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

router.get('/', (req, res, next) => {

  const dir = path.resolve('.');

  fs.readdir(process.env.READ_DIR || '.', (err, files) => {

    const filesDetails = files.map(file => {
      const stats = fs.statSync(file);

      return {
        name: file,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        isDirectory: stats.isDirectory()
      };
    }).sort((a, b) => {
      if (a.isDirectory === b.isDirectory) {
        if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
      } else if (a.isDirectory) {
        return -1;
      }
      return 1;
    })

    res.render('index', { path: dir, files: filesDetails });
  })


});

router.post('/', upload.single('file'), async (req, res, next) => {

    res.redirect("/");
});

module.exports = router;
