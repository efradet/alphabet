import React from 'react'
import { ALPHABET, FRENCH_LETTER_NAMES } from '../constants/alphabet'

export default function PronunciationList() {
  return (
    <details className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <summary className="cursor-pointer text-sm font-medium text-slate-800">Prononciation utilisée (français)</summary>
      <ul className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-y-1 text-sm text-slate-600">
        {ALPHABET.map(l => (
          <li key={l} className="flex items-center justify-between border-b border-slate-100 py-1">
            <span className="font-semibold text-slate-700">{l}</span>
            <span>{FRENCH_LETTER_NAMES[l]}</span>
          </li>
        ))}
      </ul>
    </details>
  )
}