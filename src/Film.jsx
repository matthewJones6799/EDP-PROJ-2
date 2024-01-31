import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

export function Film(props) {
  let { id } = useParams();
  const [film, setFilm] = useState([]);
  const [planet, setPlanet] = useState([]);
  const [films, setFilms] = useState([]);


  useEffect(() => {
    fetch(`/api/films/${id}`).then(res => res.json()).then(res => setFilm(res))
  }, []);

  // useEffect(() => {
  //   fetch(`/api/characters/${id}/films`).then(res => res.json()).then(res => setFilms(res))
  // }, []);

  // useEffect(() => {
  //   fetch(`/api/planets/${character.homeworld}`).then(res => res.json()).then(res => setPlanet(res))
  // }, []);

  return (<>
    <h1>{film.title}</h1>
    <section id="generalInfo">
      <p>Released: {film.release_date}</p>
      <p>Director: {film.director}</p>
      <p>Episode: {film.episode_id}</p>
    </section>
    {/* <section id="planets">
      <h2>Homeworld</h2>
      <p>{planet.name}</p>
      <p>{character.homeworld}</p>
    </section>
    <section id="films">
      <h2>Films appeared in</h2>
      <ul>
        {films.map(film => <li>{film.title}</li>)}
      </ul>
    </section> */}
  </>)
}