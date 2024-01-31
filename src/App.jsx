import { Route, Routes } from 'react-router-dom'
import { Characters } from './Characters';
import { Character } from './Character';
import './App.css'

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Characters />}></Route>
        <Route path="/characters/:id" element={<Character />}></Route>
      </Routes>
    </>
  )
}