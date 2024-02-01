import { Route, Routes } from 'react-router-dom'
import { Characters } from './Characters';
import { Character } from './Character';
import { Film } from './Film';
import { Planet } from './Planet';
import './App.css'

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Characters />}></Route>
        <Route path="/characters/:id" element={<Character />}></Route>
        <Route path="/films/:id" element = {<Film />}></Route>
        <Route path="/planets/:id" element = {<Planet/>}></Route>
      </Routes>
    </>
  )
}