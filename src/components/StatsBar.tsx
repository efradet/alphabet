import React from 'react'
import { useAppSelector } from '../redux/hooks'
import { ALPHABET } from '../constants/alphabet'
import { selectGame, selectRemainingLetters } from '../redux/gameSlice'

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}

export default function StatsBar() {
  const game = useAppSelector(selectGame)
  const remaining = useAppSelector(selectRemainingLetters)
  const succeeded = ALPHABET.filter(l => game.statusByLetter[l] === 'correct').length
  const skipped = ALPHABET.filter(l => game.statusByLetter[l] === 'skipped').length

  return (
    <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
      <Stat label="Points" value={game.score} />
      <Stat label="Restantes" value={remaining.length} />
      <Stat label="Réussies" value={succeeded} />
      <Stat label="Ignorées" value={skipped} />
    </div>
  )
}