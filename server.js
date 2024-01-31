import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();

app.use(express.json());

app.get("/api/characters", async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('swapi');
    const collection = db.collection('characters');
    const characters = await collection.find().toArray();
    client.close();
    res.json(characters);
  } catch (error) {
    res.status(500).json({error: error});
  }
});

app.get("/api/films", async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('swapi');
    const collection = db.collection('films');
    const films = await collection.find().toArray();
    client.close();
    res.json(films);
  } catch (error) {
    res.status(500).json({error: error});
  }
});

app.get("/api/planets", async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('swapi');
    const collection = db.collection('planets');
    const planets = await collection.find().toArray();
    client.close();
    res.json(planets);
  } catch (error) {
    res.status(500).json({error: error});
  }
});

app.get("/api/characters/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('swapi');
    const collection = db.collection('characters');
    const character = await collection.findOne({'id': +id});
    client.close();
    if(character) {
      res.json(character);
    } else {
      res.status(404).json({message: 'Character not found'});
    }
  } catch (error) {
    res.status(500).json({error: error});
  }
});

app.get("/api/films/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('swapi');
    const collection = db.collection('films');
    const film = await collection.findOne({'id': +id});
    client.close();
    if(film) {
      res.json(film);
    } else {
      res.status(404).json({message: 'Film not found'});
    }
  } catch (error) {
    res.status(500).json({error: error});
  }
});

app.get("/api/planets/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('swapi');
    const collection = db.collection('planets');
    const planet = await collection.findOne({'id': +id});
    client.close();
    if(planet) {
      res.json(planet);
    } else {
      res.status(404).json({message: 'Planet not found'});
    }
  } catch (error) {
    res.status(500).json({error: error});
  }
});

app.get("/api/films/:id/characters", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('swapi');
    const collection = db.collection('films_characters');
    const characters = await collection.find({'film_id': +id}).toArray();
    client.close();
    if(characters) {
      res.json(characters);
    } else {
      res.status(404).json({message: 'Character not found'});
    }
  } catch (error) {
    res.status(500).json({error: error});
  }
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}.`));