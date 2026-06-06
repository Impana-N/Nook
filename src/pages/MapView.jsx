import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { getPlacesByMood, getMoodById, moods } from '../data/places'
import { moodIcons } from '../components/MapIcons'

function getMarkerIcon(moodId, isActive) {
  const color = isActive ? '#2D6A4F' : '#52B788'
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 40px; height: 40px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      transition: all 0.2s;
      ${isActive ? 'transform: scale(1.15);' : ''}
    ">${moodIcons[moodId] || '📍'}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  })
}

function FitBounds({ places }) {
  const map = useMap()
  useMemo(() => {
    if (places.length > 0) {
      const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]))
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 })
    }
  }, [places, map])
  return null
}

function MoodPill({ mood, isActive, onClick }) {
  return (
    <button
      onClick={() => onClick(mood.id)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
        isActive
          ? 'bg-forest text-white shadow-md'
          : 'bg-white/80 text-deep/60 border border-deep/10 hover:bg-white'
      }`}
    >
      {mood.emoji} {mood.title}
    </button>
  )
}

export default function MapView() {
  const { mood } = useParams()
  const navigate = useNavigate()
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [activeMood, setActiveMood] = useState(mood)

  const filteredPlaces = useMemo(
    () => getPlacesByMood(activeMood),
    [activeMood]
  )

  const currentMood = getMoodById(activeMood)

  const center = useMemo(() => {
    if (filteredPlaces.length > 0) {
      const lat =
        filteredPlaces.reduce((s, p) => s + p.lat, 0) / filteredPlaces.length
      const lng =
        filteredPlaces.reduce((s, p) => s + p.lng, 0) / filteredPlaces.length
      return [lat, lng]
    }
    return [12.9716, 77.5946]
  }, [filteredPlaces])

  const closestPlace = useMemo(() => {
    return filteredPlaces.length > 0 ? filteredPlaces[0] : null
  }, [filteredPlaces])

  return (
    <div className="h-dvh w-full relative flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 pt-6">
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => navigate('/')}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-sm flex items-center justify-center text-deep"
          >
            ←
          </button>
          <div className="flex-1 overflow-x-auto scrollbar-hide flex gap-2 pb-1">
            {moods.map((m) => (
              <MoodPill
                key={m.id}
                mood={m}
                isActive={activeMood === m.id}
                onClick={setActiveMood}
              />
            ))}
          </div>
        </div>
        {currentMood && (
          <p className="text-xs text-deep/50 ml-11">{currentMood.description}</p>
        )}
      </div>

      <div className="flex-1 w-full relative">
        <MapContainer
          center={center}
          zoom={13}
          className="w-full h-full"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds places={filteredPlaces} />
          {filteredPlaces.map((place) => (
            <Marker
              key={place.id}
              position={[place.lat, place.lng]}
              icon={getMarkerIcon(
                activeMood,
                selectedPlace?.id === place.id
              )}
              eventHandlers={{
                click: () => setSelectedPlace(place),
              }}
            >
              <Popup className="custom-popup">
                <div className="font-medium">{place.name}</div>
                <div className="text-xs text-deep/50">{place.address}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {closestPlace && !selectedPlace && (
        <div
          onClick={() => navigate(`/place/${closestPlace.id}?mood=${activeMood}`)}
          className="absolute bottom-0 left-0 right-0 z-[1000] p-4 pb-6 safe-bottom"
        >
          <div className="glass-card p-4 cursor-pointer hover:bg-white/90 transition-colors">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{closestPlace.image}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-deep text-sm truncate">
                  {closestPlace.name}
                </h3>
                <p className="text-xs text-deep/50 truncate">
                  {closestPlace.address}
                </p>
              </div>
              <div className="flex gap-1">
                {closestPlace.moodMatches.slice(0, 2).map((m) => (
                  <span
                    key={m}
                    className="text-xs bg-soft text-forest px-2 py-0.5 rounded-full"
                  >
                    {m === activeMood ? '✨' : ''}
                    {moods.find((mo) => mo.id === m)?.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPlace && (
        <div className="absolute bottom-0 left-0 right-0 z-[1000] p-4 pb-6 safe-bottom animate-slide-up">
          <div className="glass-card p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="text-3xl">{selectedPlace.image}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-deep">
                  {selectedPlace.name}
                </h3>
                <p className="text-xs text-deep/50">{selectedPlace.address}</p>
              </div>
              <button
                onClick={() => setSelectedPlace(null)}
                className="w-7 h-7 rounded-full bg-deep/5 flex items-center justify-center text-deep/40 text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-deep/70 mb-3 line-clamp-2">
              {selectedPlace.communityNote}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {selectedPlace.vibeTags.slice(0, 4).map((tag) => (
                <span key={tag} className="vibe-tag">
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() =>
                navigate(`/place/${selectedPlace.id}?mood=${activeMood}`)
              }
              className="btn-primary"
            >
              See place profile →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
