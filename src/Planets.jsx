import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function Planets() {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    fetch("/api/planets").then(res => res.json()).then(res => setPlanets(res))
  }, []);
  return (
    planets.map(planet =>
      <>
        <Link to={`planets/${planet.id}`}>
          <button key={planet.name}>{planet.name}</button>
        </Link>
      </>
    )
  )
}