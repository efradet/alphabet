import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { ALPHABET } from '../constants/alphabet'
import { letterClicked, selectGame, selectRemainingLetters } from '../redux/gameSlice'

export default function LetterGrid() {
  const dispatch = useAppDispatch()
  const game = useAppSelector(selectGame)
  const remaining = useAppSelector(selectRemainingLetters)
  const finished = remaining.length === 0

  return (
    <div className="grid grid-cols-6 md:grid-cols-8 gap-3 md:gap-4">
      {ALPHABET.map(l => {
        const st = game.statusByLetter[l]
        const isBlink = game.blinkLetter === l
        const disabled = st !== 'pending'

        let look = 'border-slate-600 bg-slate-700 text-slate-200 hover:shadow-lg'
        if (st === 'correct') look = 'border-emerald-400 bg-emerald-700 text-emerald-100'
        if (st === 'skipped') look = 'border-orange-400 bg-orange-700 text-orange-100'

        return (
          <button
            key={l}
            className={`relative select-none rounded-2xl border shadow-sm aspect-square flex items-center justify-center text-2xl font-bold transition-all ${look} ${
              isBlink ? 'blink-orange' : ''
            } ${disabled ? 'cursor-not-allowed opacity-80' : 'hover:-translate-y-0.5 hover:shadow-md'}`}
            onClick={() => dispatch(letterClicked(l))}
            disabled={disabled || finished}
            aria-label={`Lettre ${l}`}
          >
            <span>{l}</span>
          </button>
        )
      })}
    </div>
  )
}