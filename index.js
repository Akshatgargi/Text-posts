const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3001;
const uri = "mongodb+srv://Akshat:i%40thebest@cluster1.5czo8t7.mongodb.net/?retryWrites=true&w=majority";

// Define the Mongoose schema first
const postSchema = new mongoose.Schema({
  title: String,
  description: String
});

// Create Mongoose models using the schema
const Post = mongoose.model('Post', postSchema);
const ho = mongoose.model('ho', postSchema, 'posts');
const hoe = mongoose.model('hoe', postSchema, 'posts');

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDb connection error"));
db.once('open', () => {
  console.log("Connected to MongoDB");
});

// Configure body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., your HTML file)
app.use(express.static(__dirname));

// Define a route to handle POST requests
app.post("/", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  const post = new Post({
    title: title,
    description: description
  });

  try {
    await post.save();
    console.log("Data saved to MongoDB");
    res.redirect("/");
  } catch (err) {
    console.error("Error saving data to MongoDB:", err);
    res.status(500).send('Uh-oh, an error occurred');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get('/rd',async(req,res)=>{
    try {
        const posts =  await hoe.find();
        res.send(posts)
    }
catch(err){
    console.error("Error retrieving data:", err);
        res.status(500).send("Error retrieving data");
}
})