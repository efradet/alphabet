import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { repeat, pickNextTarget, resetGame, setMuted, selectGame } from '../redux/gameSlice'

export default function HeaderBar() {
  const dispatch = useAppDispatch()
  const { target, muted } = useAppSelector(selectGame)

  return (
    <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Jeu des lettres</h1>
        <p className="text-sm text-slate-600">Sélectionne la lettre que tu entends. 3 erreurs → la lettre passe en orange et sera ignorée.</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => (target ? dispatch(repeat()) : dispatch(pickNextTarget()))}
          className="rounded-2xl px-3 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow"
        >
          {target ? 'Réécouter' : 'Commencer'}
        </button>
        <button
          onClick={() => dispatch(resetGame())}
          className="rounded-2xl px-3 py-2 text-sm font-medium bg-slate-200 hover:bg-slate-300 shadow"
        >
          Réinitialiser
        </button>
        <button
          onClick={() => dispatch(setMuted(!muted))}
          className={`rounded-2xl px-3 py-2 text-sm font-medium shadow ${
            muted ? 'bg-rose-200 hover:bg-rose-300' : 'bg-emerald-200 hover:bg-emerald-300'
          }`}
          title={muted ? 'Activer le son' : 'Couper le son'}
        >
          {muted ? 'Son coupé' : 'Son actif'}
        </button>
      </div>
    </header>
  )
}