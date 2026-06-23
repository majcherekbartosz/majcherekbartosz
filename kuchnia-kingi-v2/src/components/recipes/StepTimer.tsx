'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, Timer } from 'lucide-react'

interface StepTimerProps {
  minutes: number
}

export default function StepTimer({ minutes }: StepTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalSeconds = minutes * 60

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }, [])

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            stop()
            setIsFinished(true)
            try { navigator.vibrate?.(500) } catch { /* noop */ }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isRunning, secondsLeft, stop])

  const reset = () => {
    stop()
    setSecondsLeft(totalSeconds)
    setIsFinished(false)
  }

  const toggle = () => {
    if (isFinished) {
      reset()
      return
    }
    setIsRunning(!isRunning)
  }

  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60
  const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 ${
      isFinished
        ? 'bg-brand-50 border-brand-400 animate-pulse'
        : isRunning
        ? 'bg-surface-dim border-tertiary/40'
        : 'bg-surface-dim border-outline-variant/30'
    }`}>
      <Timer size={14} className={isFinished ? 'text-brand-400' : 'text-on-surface-variant'} />
      <span className={`font-mono text-sm font-medium tabular-nums ${
        isFinished ? 'text-brand-400' : 'text-on-surface'
      }`}>
        {display}
      </span>

      {/* Mini progress bar */}
      {isRunning && (
        <div className="w-12 h-1.5 rounded-full bg-outline-variant/30 overflow-hidden">
          <div
            className="h-full bg-tertiary rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <button
        onClick={toggle}
        className="w-6 h-6 rounded-full bg-brand-400 flex items-center justify-center active:scale-90 transition-transform"
        aria-label={isRunning ? 'Pauza' : 'Start'}
      >
        {isRunning ? (
          <Pause size={10} className="text-white" fill="white" />
        ) : (
          <Play size={10} className="text-white ml-0.5" fill="white" />
        )}
      </button>

      {(isRunning || secondsLeft < totalSeconds) && (
        <button
          onClick={reset}
          className="w-6 h-6 rounded-full border border-outline-variant flex items-center justify-center hover:border-brand-400 active:scale-90 transition-all"
          aria-label="Reset"
        >
          <RotateCcw size={10} className="text-on-surface-variant" />
        </button>
      )}
    </div>
  )
}
