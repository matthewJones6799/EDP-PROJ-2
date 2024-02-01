import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

export function Character(props) {
  let { id } = useParams();
  const [character, setCharacter] = useState([]);
  const [planet, setPlanet] = useState([]);
  const [films, setFilms] = useState([]);


  useEffect(() => {
    fetch(`/api/characters/${id}`).then(res => res.json()).then(res => setCharacter(res))
  }, []);

  useEffect(() => {
    fetch(`/api/characters/${id}/films`).then(res => res.json()).then(res => setFilms(res))
  }, []);

  useEffect(() => {
    fetch(`/api/planets/${character.homeworld}`).then(res => res.json()).then(res => setPlanet(res))
  }, []);

  return (<>
    <h1>{character.name}</h1>
    <section id="generalInfo">
      <p>Height: {character.height} cm</p>
      <p>Mass: {character.mass} kg</p>
      <p>Born: {character.birth_year}</p>
    </section>
    <section id="planets">
      <h2>Homeworld</h2>
      <p>{planet.name}</p>
      <p>{character.homeworld}</p>
    </section>
    <section id="films">
      <h2>Films appeared in</h2>
      {films.map(film =>
        <>
          <Link to={`/films/${film.id}`}>
            <button key={film.title}>{film.title}</button>
          </Link>
        </>
      )}
    </section>
  </>)
}


// const filmsLis = character?.films?.map(film => `<li><a href="/films.html?id=${film.id}">${film.title}</li>`)