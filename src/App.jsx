import { Route, Routes } from 'react-router-dom'
import { Characters } from './Characters';
import { Character } from './Character';
import { Films } from './Films';
import { Planets } from './Planets';
import './App.css'

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<><Characters /><Films />
        <Planets /></>}></Route>
        <Route path="/characters/:id" element={<Character />}></Route>
      </Routes>
    </>
  )
}