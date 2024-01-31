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
    const collection1 = db.collection('films_characters');
    const charactersInFilm = await collection1.find({'film_id': +id}).toArray();
    const characterIds = charactersInFilm.map(cif => cif.character_id);
    const characters = await db.collection('characters').find({"id":{$in:characterIds}}).toArray();
    client.close();
    
    if(characters) {
      res.json(characters.sort(sortID));
    } else {
      res.status(404).json({message: 'Character not found'});
    }
  } catch (error) {
    res.status(500).json({error: error});
  }
});

app.get("/api/films/:id/planets", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('swapi');
    const collection1 = db.collection('films_planets');
    const planetsInFilm = await collection1.find({'film_id': +id}).toArray();
    const planetIds = planetsInFilm.map(pif => pif.planet_id);
    const planets = await db.collection('planets').find({"id":{$in:planetIds}}).toArray();
    client.close();
    
    if(planets) {
      res.json(planets.sort(sortID));
    } else {
      res.status(404).json({message: 'Character not found'});
    }
  } catch (error) {
    res.status(500).json({error: error});
  }
});

app.get("/api/characters/:id/films", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('swapi');
    const collection1 = db.collection('films_characters');
    const characterInFilms = await collection1.find({'character_id': +id}).toArray();
    const filmIds = characterInFilms.map(cif => cif.film_id);
    const films = await db.collection('films').find({"id":{$in:filmIds}}).toArray();
    client.close();
    
    if(films) {
      res.json(films);
    } else {
      res.status(404).json({message: 'Character not found'});
    }
  } catch (error) {
    res.status(500).json({error: error});
  }
});

app.get("/api/planets/:id/films", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('swapi');
    const collection1 = db.collection('films_planets');
    const planetInFilms = await collection1.find({'planet_id': +id}).toArray();
    const filmIds = planetInFilms.map(pif => pif.film_id);
    const films = await db.collection('films').find({"id":{$in:filmIds}}).toArray();
    client.close();
    
    if(films) {
      res.json(films);
    } else {
      res.status(404).json({message: 'Character not found'});
    }
  } catch (error) {
    res.status(500).json({error: error});
  }
});

app.get("/api/planets/:id/characters", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('swapi');
    const collection = db.collection('characters');
    const charactersInPlanet = await collection.find({'homeworld': +id}).toArray();
    client.close();
    if(charactersInPlanet) {
      res.json(charactersInPlanet);
    } else {
      res.status(404).json({message: 'Planet not found'});
    }
  } catch (error) {
    res.status(500).json({error: error});
  }
});

function sortID(a, b) {
  return +(a.id) - +(b.id)
}

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}.`));