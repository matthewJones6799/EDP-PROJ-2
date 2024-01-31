// The web server
import express from 'express';
// import { MongoClient } from 'mongodb';

const app = express();

app.use(express.json());

//Serve all the planets at GET /planets
app.get("/api/planets", async (req, res) => {
  try {
    // const client = await MongoClient.connect('mongodb://localhost:27017');
    // const db = client.db('swapi');
    // const collection = db.collection('planets');
    // const planets = await collection.find().toArray();
    // client.close();
    const planets = {"fake":"object"}
    res.json(planets);
  } catch (error) {
    res.status(500).json({error: error});
  }
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}.`));