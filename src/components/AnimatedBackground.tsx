'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  left: number
  delay: number
  duration: number
}

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 15 + Math.random() * 10,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="animated-bg">
      {/* Gradient Orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      {/* Particles */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              background: `rgba(${Math.random() > 0.5 ? '255, 215, 0' : '0, 212, 255'}, ${0.4 + Math.random() * 0.4})`,
            }}
          />
        ))}
      </div>

      {/* Grid Overlay */}
      <div className="grid-overlay" />

      {/* Glowing Lines */}
      <div className="glow-line glow-line-1" />
      <div className="glow-line glow-line-2" />

      {/* Geometric Shapes */}
      <div className="geo-shape geo-triangle" />
      <div className="geo-shape geo-circle" />
      <div className="geo-shape geo-square" />

      {/* Noise Overlay */}
      <div className="noise-overlay" />
    </div>
  )
}
