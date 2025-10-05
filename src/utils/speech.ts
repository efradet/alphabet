import { FRENCH_LETTER_NAMES } from '../constants/alphabet'

let cachedVoices: SpeechSynthesisVoice[] | null = null

function loadVoices() {
  cachedVoices = window.speechSynthesis.getVoices()
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices()
  window.speechSynthesis.onvoiceschanged = loadVoices
}

export function speakLetter(letter: string, muted: boolean) {
  if (muted) return
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

  try {
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(FRENCH_LETTER_NAMES[letter] ?? letter)
    const fr = cachedVoices?.find(v => v.lang?.toLowerCase().startsWith('fr'))
    if (fr) utter.voice = fr
    utter.rate = 0.95
    window.speechSynthesis.speak(utter)
  } catch {
    // ignore
  }
}

export function speakResult(text: string, muted: boolean) {
  if (muted) return
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  try {
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    const fr = cachedVoices?.find(v => v.lang?.toLowerCase().startsWith('fr'))
    if (fr) utter.voice = fr
    utter.rate = 0.95
    window.speechSynthesis.speak(utter)
  } catch {
    // ignore
  }
} 