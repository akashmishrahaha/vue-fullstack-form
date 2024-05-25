// Import required modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

// Connection URL
const url = `mongodb://${DB_USER}:${DB_PASS}127.0.0.1:27017`;
const client = new MongoClient(url);
const dbName = "company_db";
const collName = "employees";


// Connect to MongoDB once during server startup
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB server');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error; // Rethrow error to indicate connection failure
  }
}

// Middleware setup
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/dist'));

// Define routes
async function defineRoutes() {
  // Wait for MongoDB connection before defining routes
  await connectToMongoDB();

  // GET Route
  app.get('/get-profile', async function(req, res) {
    try {
      // Get the database and collection
      const db = client.db(dbName);
      const collection = db.collection(collName);
      const result = await collection.findOne({id: 1});
  
      if (!result) {
        res.send({});
      } else {
        const response = {
          name: result.name,
          email: result.email,
          interests: result.interests
        };
        res.send(response);
      }
    } catch (error) {
      console.error('Error in GET /get-profile:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // POST Route
  app.post('/update-profile', async function(req, res) {
    try {
      const payload = req.body;
      console.log(payload)
      if (Object.keys(payload).length === 0) {
        res.status(400).send("Error: empty payload");
        return;
      }

      // Get the database and collection
      const db = client.db(dbName);
      const collection = db.collection(collName);
  
      // Update the document
      payload['id'] = 1;
      const updatedValues = { $set: payload };
      await collection.updateOne({ id: 1 }, updatedValues, { upsert: true });

      res.status(200).send({ info: "User data updated" });
    } catch (error) {
      console.error('Error in POST /update-profile:', error);
      res.status(500).send('Internal Server Error');
    }
  });
}

// Start the server
async function startServer() {
  try {
    await defineRoutes(); // Define routes before starting the server
    const PORT = 3000;
    app.listen(PORT, function() {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

// Start the server
startServer();

module.exports = {
  app
};
