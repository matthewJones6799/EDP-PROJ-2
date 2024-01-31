import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

export function Character(props) {
  const [character, setCharacter] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    fetch(`/api/characters/${id}`).then(res => res.json()).then(res => setCharacter(res))
  }, []);
  
  return (<>
    <h1>{character.name}</h1>
  </>)
}