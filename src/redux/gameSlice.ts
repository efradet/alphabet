import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ALPHABET } from '../constants/alphabet'
import type { AppDispatch, RootState } from './store'
import { speakLetter, speakResult } from '../utils/speech'

export type LetterState = 'pending' | 'correct' | 'skipped'

interface GameState {
  statusByLetter: Record<string, LetterState>
  failCount: Record<string, number>
  target: string | null
  score: number
  muted: boolean
  blinkLetter: string | null
}

const initialState: GameState = {
  statusByLetter: Object.fromEntries(ALPHABET.map(l => [l, 'pending'])) as Record<string, LetterState>,
  failCount: Object.fromEntries(ALPHABET.map(l => [l, 0])) as Record<string, number>,
  target: null,
  score: 0,
  muted: false,
  blinkLetter: null,
}

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetGame(state) {
      state.statusByLetter = Object.fromEntries(ALPHABET.map(l => [l, 'pending'])) as Record<string, LetterState>
      state.failCount = Object.fromEntries(ALPHABET.map(l => [l, 0])) as Record<string, number>
      state.target = null
      state.score = 0
      state.blinkLetter = null
    },
    setMuted(state, action: PayloadAction<boolean>) {
      state.muted = action.payload
    },
    setTarget(state, action: PayloadAction<string | null>) {
      state.target = action.payload
    },
    setBlink(state, action: PayloadAction<string | null>) {
      state.blinkLetter = action.payload
    },
    markCorrect(state, action: PayloadAction<string>) {
      const letter = action.payload
      if (state.statusByLetter[letter] === 'pending') {
        state.statusByLetter[letter] = 'correct'
        state.score += 1
        state.failCount[letter] = 0
      }
    },
    markSkipped(state, action: PayloadAction<string>) {
      const letter = action.payload
      if (state.statusByLetter[letter] === 'pending') {
        state.statusByLetter[letter] = 'skipped'
      }
    },
    incrementFail(state, action: PayloadAction<string>) {
      const letter = action.payload
      state.failCount[letter] = (state.failCount[letter] ?? 0) + 1
    },
  },
})

export const { resetGame, setMuted, setTarget, setBlink, markCorrect, markSkipped, incrementFail } = slice.actions

// Selectors
export const selectGame = (s: RootState) => s.game
export const selectRemainingLetters = (s: RootState) => ALPHABET.filter(l => s.game.statusByLetter[l] === 'pending')
export const selectFinished = (s: RootState) => selectRemainingLetters(s).length === 0

// Thunks
export const pickNextTarget = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const remaining = selectRemainingLetters(getState())
  if (remaining.length === 0) {
    dispatch(setTarget(null))
    setTimeout(() => {
      const { muted } = getState().game
      speakResult("Bravo Elisabeth, maman et papa sont fiers de toi, si tu deviens forte en Math, en lecture, tu auras le monde à tes pieds.", muted)
    }, 120)
    return
  }
  const next = remaining[Math.floor(Math.random() * remaining.length)]
  dispatch(setTarget(next))
  setTimeout(() => {
    const { muted } = getState().game
    speakLetter(next, muted)
  }, 120)
}

export const startGame = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const { target } = getState().game
  if (target === null) {
    dispatch(pickNextTarget())
  }
}

export const repeat = () => (_dispatch: AppDispatch, getState: () => RootState) => {
  const { target, muted } = getState().game
  if (target) {
    speakLetter(target, muted)
  }
}

export const letterClicked = (clicked: string) => (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState().game
  const { target } = state
  if (!target) return
  if (state.statusByLetter[clicked] !== 'pending') return

  if (clicked === target) {
    dispatch(markCorrect(target))
    dispatch(setTarget(null))
    setTimeout(() => dispatch(pickNextTarget()), 200)
  } else {
    // Blink the correct letter
    dispatch(setBlink(target))
    setTimeout(() => dispatch(setBlink(null)), 900)

    const currentFails = (state.failCount[target] ?? 0) + 1
    dispatch(incrementFail(target))

    if (currentFails >= 3) {
      dispatch(markSkipped(target))
      dispatch(setTarget(null))
      setTimeout(() => dispatch(pickNextTarget()), 250)
    } else {
      setTimeout(() => dispatch(repeat()), 250)
    }
  }
}

export default slice.reducer