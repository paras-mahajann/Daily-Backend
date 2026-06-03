import React, { useState, useRef, useEffect } from 'react'
import './player.scss'

const Player = ({ audioSrc = null }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    if (!audioSrc || !audioRef.current) return

    audioRef.current.currentTime = 0
    audioRef.current.playbackRate = speed
    audioRef.current.volume = volume

    const playPromise = audioRef.current.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          setIsPlaying(false)
        })
    }
  }, [audioSrc])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 5,
        duration
      )
    }
  }

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 5,
        0
      )
    }
  }

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value)
    setSpeed(newSpeed)
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className="player-container">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="player-header">
        <h2>Music Player</h2>
      </div>

      <div className="player-display">
        <div className="time-display">
          <span className="current-time">{formatTime(currentTime)}</span>
          <span className="duration">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="progress-section">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="progress-bar"
        />
      </div>

      <div className="controls-section">
        <div className="main-controls">
          <button
            className="control-btn skip-backward"
            onClick={skipBackward}
            title="Skip 5 seconds backward"
          >
            <span>⏮ -5s</span>
          </button>

          <button
            className={`control-btn play-pause ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlayPause}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <span>{isPlaying ? '⏸ Pause' : '▶ Play'}</span>
          </button>

          <button
            className="control-btn skip-forward"
            onClick={skipForward}
            title="Skip 5 seconds forward"
          >
            <span>+5s ⏭</span>
          </button>
        </div>

        <div className="settings-controls">
          <div className="setting-group">
            <label htmlFor="speed-control">Speed:</label>
            <select
              id="speed-control"
              value={speed}
              onChange={handleSpeedChange}
              className="speed-control"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={1.75}>1.75x</option>
              <option value={2}>2x</option>
            </select>
          </div>

          <div className="setting-group">
            <label htmlFor="volume-control">Volume:</label>
            <input
              id="volume-control"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-control"
            />
            <span className="volume-value">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      </div>

      <div className="player-info">
        {!audioSrc && (
          <p className="no-audio">No audio source provided</p>
        )}
      </div>
    </div>
  )
}

export default Player

