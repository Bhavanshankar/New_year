"use client"

import { Center, Text3D } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type * as THREE from "three"

export default function Text3DComponent() {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Center>
      <Text3D
        ref={textRef}
        font="/fonts/Geist_Bold.json"
        size={1.5}
        height={0.3}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        2026
        <meshStandardMaterial
          color="#f6d365"
          metalness={0.8}
          roughness={0.2}
          emissive="#fda085"
          emissiveIntensity={0.5}
        />
      </Text3D>
    </Center>
  )
}
