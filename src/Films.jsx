import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function Films() {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    fetch("/api/films").then(res => res.json()).then(res => setFilms(res))
  }, []);
  return (
    films.map(film =>
      <>
        <Link to={`films/${film.id}`}>
          <button key={film.title}>{film.title}</button>
        </Link>
      </>
    )
  )
}