"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  life: number
  maxLife: number
  color: THREE.Color
}

export default function Fireworks() {
  const particlesRef = useRef<THREE.Points>(null)
  const particles = useRef<Particle[]>([])
  const lastSpawnTime = useRef(0)

  const particleCount = 2000
  const positions = useMemo(() => new Float32Array(particleCount * 3), [particleCount])
  const colors = useMemo(() => new Float32Array(particleCount * 3), [particleCount])

  const spawnFirework = (time: number) => {
    const burstPosition = new THREE.Vector3((Math.random() - 0.5) * 6, Math.random() * 2 + 1, (Math.random() - 0.5) * 4)

    const colorPalettes = [
      [new THREE.Color("#ff0844"), new THREE.Color("#ffb199")],
      [new THREE.Color("#08ffc8"), new THREE.Color("#fff685")],
      [new THREE.Color("#d4af37"), new THREE.Color("#ffd700")],
      [new THREE.Color("#ff6b35"), new THREE.Color("#f7931e")],
      [new THREE.Color("#9b5de5"), new THREE.Color("#f15bb5")],
    ]

    const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)]
    const particlesToSpawn = 30 + Math.floor(Math.random() * 20)

    for (let i = 0; i < particlesToSpawn; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const speed = 2 + Math.random() * 3

      particles.current.push({
        position: burstPosition.clone(),
        velocity: new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed,
          Math.cos(phi) * speed,
        ),
        life: 1,
        maxLife: 1 + Math.random() * 1.5,
        color: palette[Math.floor(Math.random() * palette.length)].clone(),
      })
    }
  }

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Spawn new fireworks periodically
    if (time - lastSpawnTime.current > 1.5) {
      spawnFirework(time)
      lastSpawnTime.current = time
    }

    // Update particles
    particles.current = particles.current.filter((particle) => {
      particle.life -= 0.016

      if (particle.life <= 0) return false

      // Apply physics
      particle.velocity.y -= 0.05 // gravity
      particle.velocity.multiplyScalar(0.98) // air resistance
      particle.position.add(particle.velocity.clone().multiplyScalar(0.016))

      return true
    })

    // Update geometry
    for (let i = 0; i < particleCount; i++) {
      if (i < particles.current.length) {
        const particle = particles.current[i]
        positions[i * 3] = particle.position.x
        positions[i * 3 + 1] = particle.position.y
        positions[i * 3 + 2] = particle.position.z

        const lifeRatio = particle.life / particle.maxLife
        colors[i * 3] = particle.color.r * lifeRatio
        colors[i * 3 + 1] = particle.color.g * lifeRatio
        colors[i * 3 + 2] = particle.color.b * lifeRatio
      } else {
        positions[i * 3] = 0
        positions[i * 3 + 1] = -100
        positions[i * 3 + 2] = 0
        colors[i * 3] = 0
        colors[i * 3 + 1] = 0
        colors[i * 3 + 2] = 0
      }
    }

    if (particlesRef.current) {
      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.geometry.attributes.color.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
