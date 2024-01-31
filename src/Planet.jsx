import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

export function Character(props) {
  let { id } = useParams();
  const [characters, setCharacters] = useState([]);
  const [planet, setPlanet] = useState([]);
  const [films, setFilms] = useState([]);
  

  useEffect(() => {
    fetch(`/api/planets/${id}`).then(res => res.json()).then(res => setPlanet(res))
  }, []);

  useEffect(() => {
    fetch(`/api/planets/${id}/films`).then(res => res.json()).then(res => setFilms(res))
  }, []);

  useEffect(() => {
    fetch(`/api/characters/${id}/characters`).then(res => res.json()).then(res => setCharacters(res))
  }, []);



  return (<>
    <h1>{planet.name}</h1>
    <section id="generalInfo">
      <p>Climate: {planet.climate}</p>
      <p>Surface Water: {planet.surface_water}</p>
      <p>Diameter: {planet.diameter}</p>
      <p>Rotation Period: {planet.rotation_period}</p>
      <p>Terrain: {planet.terrain}</p>
      <p>Gravity: {planet.gravity}</p>
      <p>Orbital Period: {planet.orbital_period}</p>
      <p>Population: {planet.population}</p>
    </section>


    <section id="characters">
      <h2>Characters In This Movie</h2>
      <p>{planet.name}</p>
      <p>{character.homeworld}</p>
    </section>
    <section id="films">
      <h2>Films appeared in</h2>
      <ul>
      {films.map(film => <li>{film.title}</li>)}
      </ul>
    </section>
  </>)
}
