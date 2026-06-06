import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MapView from './pages/MapView'
import PlaceProfile from './pages/PlaceProfile'

export default function App() {
  return (
    <div className="min-h-dvh bg-soft">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map/:mood" element={<MapView />} />
        <Route path="/place/:id" element={<PlaceProfile />} />
      </Routes>
    </div>
  )
}
