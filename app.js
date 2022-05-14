const express = require('express')
const app = express()
let ejs = require('ejs');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const port = process.env.PORT || 3000
const fs = require("fs");

const path = require('path');

app.use('/file', express.static(path.join(__dirname, 'public')))

app.use(fileUpload({preserveExtension: true}));
app.use(express.urlencoded({ extended: true })); // reikalinga nuskityti formos duomenims 
app.set('view engine', 'ejs');

app.use(cors())

app.get('/', (req, res) => {
  let files = fs.readdirSync(__dirname + "/public/");
  var url = `${req.protocol}://${req.get('host')}/file/`
  res.render('index.ejs', { files: files, url: url });
    //res.send("file server is working");
})

app.listen(port, () => {
  console.log(` files api ${port}`)
})

app.post('/upload', function(req, res) {
  let uploadfile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.redirect('/');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  uploadfile = req.files.uploadfile;
  uploadPath = __dirname + '/public/' + uploadfile.name;

  // Use the mv() method to place the file somewhere on your server
  uploadfile.mv(uploadPath, function(err) {
    if (err)
    return res.redirect('/');

    return res.redirect('/');
  });
});

app.get('/download/:name', (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
})

app.delete('/delete/:name', (req, res) => {
  const fileName = req.params.name;
  fs.unlinkSync(__dirname + "/public/" + fileName);
  res.send();
})

