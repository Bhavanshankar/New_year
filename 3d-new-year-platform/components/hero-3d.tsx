"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { Suspense } from "react"
import Fireworks from "./fireworks"
import Text3DComponent from "./text-3d-component"
import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"

interface Hero3DProps {
  onEnter: () => void
}

export default function Hero3D({ onEnter }: Hero3DProps) {
  return (
    <div className="relative h-screen w-full">
      <Canvas className="absolute inset-0">
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-5, 5, 5]} intensity={0.5} />

          <Text3DComponent />
          <Fireworks />

          <Environment preset="night" />
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />

          <EffectComposer>
            <Bloom intensity={1.5} luminanceThreshold={0.3} luminanceSmoothing={0.9} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <div className="text-center space-y-6 px-4">
          <h2 className="text-white/90 text-2xl md:text-4xl font-light tracking-wide">Welcome to</h2>
          <div className="h-32" />
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience the future of celebration with immersive 3D visuals, heartfelt sentiments, and interactive
            moments
          </p>
          <Button
            onClick={onEnter}
            size="lg"
            className="pointer-events-auto mt-8 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white border-0 shadow-2xl shadow-amber-500/20"
          >
            Enter the Celebration
            <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
          </Button>
        </div>
      </div>
    </div>
  )
}
