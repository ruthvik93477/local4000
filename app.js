const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://ruthvik:ruthvik@cluster1.onhko9g.mongodb.net/ecom');
const db = mongoose.connection;

// Create a schema for the data
const dataSchema = new mongoose.Schema({
  cn: String,
  name: String,
  cf: String,
  jan: Number,
  feb: Number,
  mar: Number,
  apr: Number,
  may: Number,
  jun: Number,
  jul: Number,
  aug: Number,
  sep: Number,
  oct: Number,
  nov: Number,
  dec: Number,
  jan_ml: Number,
  feb_ml: Number,
  mar_ml: Number,
  apr_ml: Number,
  may_ml: Number,
  jun_ml: Number,
  jul_ml: Number,
  aug_ml: Number,
  sep_ml: Number,
  oct_ml: Number,
  nov_ml: Number,
  dec_ml: Number,
  aLeaves: Number,
  mLeaves: Number,
});

// Create a model based on the schema
const InputData = mongoose.model('InputData', dataSchema);

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/search', (req, res) => {
    const searchName = req.body.search_name;
  
    // Query the database for the provided name
    InputData.findOne({ name: searchName }).exec()
      .then(result => {
        if (result) {
          // If the result is found, display the data
          res.render('result', { result: result });
        } else {
          // If no result is found, display an error message
          res.render('result', { error: "No data found for the given name." });
        }
      })
      .catch(err => {
        console.error(err);
        res.render('result', { error: "Error occurred while searching." });
      });
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
