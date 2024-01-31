import { useState, useEffect } from 'react'
import './App.css'

export function App() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetch("/api/characters").then(res => res.json()).then(res => setCharacters(res))
  }, []);
  return (
    <>
      {characters.map(character =>
        <h1 key={character.name}>{character.name}</h1>
      )}
    </>
  )
}