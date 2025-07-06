import { useCallback, useEffect, useRef, useState } from 'react'
import { GameEngine } from './engine/GameEngine'
import { Player } from './engine/Player'
import { Obstacle } from './engine/Obstacle'
import { Coin } from './engine/Coin'
import './styles.css'

export function Game({ maxDamage = 10 }: { maxDamage?: number }) {
  const [score, setScore] = useState(0)
  const [damage, setDamage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<GameEngine | null>(null)
  const obstacleRef = useRef<Obstacle | null>(null)
  const playerRef = useRef<Player | null>(null)
  const coinRef = useRef<Coin | null>(null)

  const handleOnScore = useCallback(() => {
    setScore(prev => prev + 1)
  }, [])

  const handleOnDamage = useCallback(() => {
    setDamage(prev => {
      const next = prev + 1

      if (next >= maxDamage) {
        engineRef.current?.stop()
        setIsPaused(false)
      }
      return next
    })
  }, [maxDamage])

  const handleOnPause = () => {
    setIsPaused(prev => {
      const newState = !prev

      if (engineRef.current) {
        newState ? engineRef.current.pause() : engineRef.current.resume()
      }

      return newState
    })
  }

  const handleRestart = () => {
    setScore(0)
    setDamage(0)

    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    if (
      engineRef.current &&
      playerRef.current &&
      obstacleRef.current &&
      coinRef.current
    ) {
      engineRef.current
        .removeAllSceneObjects()
        .clearAndRenderEmpty()
        .initSceneObject(playerRef.current.reset())
        .initSceneObject(obstacleRef.current.reset())
        .initSceneObject(coinRef.current.reset())
        .init()
    }

    engineRef.current?.start()
  }

  const handleKeys = useCallback((e: KeyboardEvent) => {
    switch (e.code) {
      case 'Space':
        playerRef.current?.jump()
        break
      case 'KeyP':
        handleOnPause()
        break
      default:
        break
    }
  }, [])

  const initGame = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!engineRef.current) {
        engineRef.current = new GameEngine({
          ctx,
          onDamage: handleOnDamage,
          onScore: handleOnScore,
        })
      }

      if (!playerRef.current) playerRef.current = new Player(ctx)
      if (!obstacleRef.current) obstacleRef.current = new Obstacle(ctx)
      if (!coinRef.current) coinRef.current = new Coin(ctx)

      engineRef.current
        .initSceneObject(playerRef.current)
        .initSceneObject(obstacleRef.current)
        .initSceneObject(coinRef.current)
        .init()
    },
    [handleOnDamage, handleOnScore]
  )

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    initGame(ctx)

    window.addEventListener('keydown', handleKeys)
    window.addEventListener('resize', resizeCanvas)

    resizeCanvas()
    engineRef.current?.start()

    return () => {
      engineRef.current?.stop()
      window.removeEventListener('keydown', handleKeys)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [initGame, handleKeys, resizeCanvas])

  return (
    <div className="game-container">
      {damage >= maxDamage ? (
        <div className="header">
          <span>Игра окончена, вы набрали очков: {score}</span>
          <button onClick={handleRestart}>Начать заново</button>
        </div>
      ) : (
        <div className="header">
          Очки: {score} / Урон: {damage}
          <div className="menu">
            <button className="pause-button" onClick={handleOnPause}>
              {isPaused ? 'Продолжить' : 'Пауза'}
            </button>
            <span>
              или нажмите <strong>P</strong> для паузы
            </span>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="canvas" />
    </div>
  )
}
