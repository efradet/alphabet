import React, { useEffect } from 'react'
import HeaderBar from './components/HeaderBar'
import StatsBar from './components/StatsBar'
import LetterGrid from './components/LetterGrid'
import PronunciationList from './components/PronunciationList'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { selectFinished, selectGame, startGame } from './redux/gameSlice'

const showLetter = false


export default function App() {
  const dispatch = useAppDispatch()
  const finished = useAppSelector(selectFinished)
  const game = useAppSelector(selectGame)

  useEffect(() => {
    // Démarrage automatique : choisit une première lettre si aucune cible
    dispatch(startGame())
  }, [dispatch])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-6 md:py-10">
        <HeaderBar />
        <StatsBar />

        <div className="mb-4">
          {finished ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm text-center">
              <p className="text-lg">🎉 Bravo ! C'est terminé.</p>
              <p className="text-sm text-slate-600">Tu peux recommencer pour t'entraîner encore.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm flex items-center justify-between">
              {showLetter && (<p className="text-sm text-slate-700">
                Lettre à trouver :
                <span className="ml-2 inline-flex items-center rounded-xl bg-indigo-50 px-3 py-1 font-semibold text-indigo-700">
                  {game.target ?? '—'}
                </span>
              </p>)}
              <p className="text-sm text-slate-500">
                Erreurs sur cette lettre : <span className="font-semibold">{game.target ? game.failCount[game.target] ?? 0 : 0}/3</span>
              </p>
            </div>
          )}
        </div>

        <LetterGrid />
        <PronunciationList />
      </div>
    </div>
  )
}