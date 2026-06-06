import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { getPlaceById, getMoodById, moods } from '../data/places'

export default function PlaceProfile() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const moodId = searchParams.get('mood')
  const place = getPlaceById(id)
  const mood = getMoodById(moodId)

  if (!place) {
    return (
      <div className="min-h-dvh flex items-center justify-center px-5">
        <div className="text-center">
          <div className="text-4xl mb-3">🫗</div>
          <h2 className="text-xl font-semibold text-deep mb-2">
            Place not found
          </h2>
          <button onClick={() => navigate('/')} className="btn-primary max-w-xs mt-4">
            Back home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex flex-col safe-bottom">
      <div className="relative h-48 bg-gradient-to-br from-forest to-deep flex items-end p-5 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-lg"
        >
          ←
        </button>
        <div className="text-5xl">{place.image}</div>
      </div>

      <div className="flex-1 px-5 pt-5 pb-8 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-deep mb-1">{place.name}</h1>
          <p className="text-sm text-deep/50">{place.address}</p>
        </div>

        {mood && (
          <div
            className="rounded-xl p-4 text-white"
            style={{
              background: `linear-gradient(135deg, ${mood.gradient.split(' ').filter((s) => s.startsWith('#')).join(', ')})`,
            }}
          >
            <p className="text-xs opacity-80 mb-1">Visiting when you're feeling</p>
            <p className="font-medium">
              {mood.emoji} {mood.title}
            </p>
          </div>
        )}

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-deep/40 mb-3">
            Vibe tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {place.vibeTags.map((tag) => (
              <span key={tag} className="vibe-tag text-sm px-3.5 py-1.5">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-deep/5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-deep/40 mb-2">
            Community note
          </h3>
          <p className="text-sm text-deep/80 leading-relaxed">
            {place.communityNote}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-deep/5">
            <p className="text-xs text-deep/40 mb-1">Best time</p>
            <p className="text-sm font-medium text-deep">{place.bestTime}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-deep/5">
            <p className="text-xs text-deep/40 mb-1">Type</p>
            <p className="text-sm font-medium text-deep capitalize">{place.type}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-deep/40 mb-3">
            Amenities
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {place.amenities.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-2 text-sm text-deep/70"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                {amenity}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <a
            href={place.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary block text-center"
          >
            Take me here
          </a>
          <button
            onClick={() => navigate(`/map/${moodId || ''}`)}
            className="w-full py-3 rounded-xl font-medium text-forest bg-soft hover:bg-white transition-colors duration-200 text-center"
          >
            ← Back to map
          </button>
        </div>
      </div>
    </div>
  )
}
