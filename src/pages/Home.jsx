import { useNavigate } from 'react-router-dom'
import { moods } from '../data/places'

function MoodCard({ mood }) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/map/${mood.id}`)}
      className="bg-white rounded-2xl px-4 py-3.5 shadow-md w-full text-left hover:shadow-lg transition-shadow duration-200"
    >
      <div className="text-3xl mb-2">{mood.emoji}</div>
      <h2 className="text-lg font-semibold text-forest mb-0.5">{mood.title}</h2>
      <p className="text-sm" style={{ color: '#555555' }}>{mood.subtitle}</p>
    </button>
  )
}

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col px-5 py-8 safe-bottom">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🪹</div>
          <h1 className="text-3xl font-bold text-forest mb-2">Nook</h1>
          <p className="text-deep text-sm leading-relaxed max-w-xs mx-auto">
            Find your place, however you feel.
            Pick a mood and discover Bangalore's best third places.
          </p>
        </div>

        <div className="grid gap-3">
          {moods.map((mood) => (
            <MoodCard key={mood.id} mood={mood} />
          ))}
        </div>

        <p className="text-center text-xs text-deep/85 mt-8">
          No login needed. Just you and where you need to be.
        </p>
      </div>
    </div>
  )
}
