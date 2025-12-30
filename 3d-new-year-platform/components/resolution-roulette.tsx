"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Dices, RefreshCw } from "lucide-react"

const resolutions = [
  {
    title: "The Fitness Fanatic",
    description: "Hit the gym 5 times a week and finally master that yoga pose you saw on Instagram.",
    type: "serious",
  },
  {
    title: "The Social Butterfly",
    description: "Say yes to every social invitation and become the life of every party.",
    type: "social",
  },
  {
    title: "The Digital Detox Enthusiast",
    description: "Spend less time scrolling and more time living. Delete one social app each month.",
    type: "serious",
  },
  {
    title: "The Accidental Chef",
    description: "Cook at home 4 nights a week. Bonus points if you don't burn the kitchen down.",
    type: "absurd",
  },
  {
    title: "The Spontaneous Adventurer",
    description: "Take one random road trip each quarter. GPS optional, sense of direction required.",
    type: "adventure",
  },
  {
    title: "The Professional Procrastinator Reformer",
    description: "Finally start that side project you've been talking about since 2020.",
    type: "serious",
  },
  {
    title: "The Budget Boss",
    description: "Track every expense and save at least 20% of your income. Avocado toast budget included.",
    type: "serious",
  },
  {
    title: "The Plant Parent Pro",
    description: "Keep at least 5 plants alive for the entire year. May they rest in peace if you fail.",
    type: "absurd",
  },
  {
    title: "The Minimalist Master",
    description: "Declutter your space. If you haven't used it in a year, it's gone.",
    type: "lifestyle",
  },
  {
    title: "The Learning Legend",
    description: "Learn a new skill every quarter. From pottery to Python, the world is your classroom.",
    type: "serious",
  },
  {
    title: "The Morning Person (Sort Of)",
    description: "Wake up at 6 AM daily. Coffee is your co-pilot on this journey.",
    type: "absurd",
  },
  {
    title: "The Gratitude Guru",
    description: "Write down three things you're grateful for every single day.",
    type: "mindful",
  },
  {
    title: "The Hydration Hero",
    description: "Drink 8 glasses of water daily. Your skin will thank you.",
    type: "health",
  },
  {
    title: "The Random Act of Kindness Champion",
    description: "Perform one unexpected act of kindness per week. Spread the love.",
    type: "social",
  },
  {
    title: "The Crocs Acceptance Activist",
    description: "Embrace Crocs as formal wear and wear them to at least one fancy event.",
    type: "absurd",
  },
]

export default function ResolutionRoulette() {
  const [currentResolution, setCurrentResolution] = useState(resolutions[0])
  const [isSpinning, setIsSpinning] = useState(false)

  const spin = () => {
    setIsSpinning(true)
    let spins = 0
    const maxSpins = 20

    const interval = setInterval(() => {
      setCurrentResolution(resolutions[Math.floor(Math.random() * resolutions.length)])
      spins++

      if (spins >= maxSpins) {
        clearInterval(interval)
        setIsSpinning(false)
      }
    }, 100)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "serious":
        return "bg-blue-500/20 text-blue-300"
      case "absurd":
        return "bg-pink-500/20 text-pink-300"
      case "adventure":
        return "bg-green-500/20 text-green-300"
      case "lifestyle":
        return "bg-purple-500/20 text-purple-300"
      case "mindful":
        return "bg-amber-500/20 text-amber-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white p-8">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center gap-3">
          <Dices className="w-8 h-8 text-amber-400" />
          <h3 className="text-2xl font-bold">Resolution Roulette</h3>
        </div>

        <p className="text-white/70 text-center max-w-xl">
          Spin the wheel and let fate decide your 2026 resolution. Will it be serious or absurd? Only one way to find
          out.
        </p>

        <div className="w-full max-w-2xl min-h-[200px] flex items-center justify-center">
          <div
            className={`text-center space-y-4 transition-all duration-300 ${isSpinning ? "scale-95 blur-sm" : "scale-100"}`}
          >
            <div className="flex justify-center">
              <span className={`px-4 py-1 rounded-full text-sm ${getTypeColor(currentResolution.type)}`}>
                {currentResolution.type.charAt(0).toUpperCase() + currentResolution.type.slice(1)}
              </span>
            </div>
            <h4 className="text-3xl font-bold text-amber-400">{currentResolution.title}</h4>
            <p className="text-lg text-white/80 leading-relaxed">{currentResolution.description}</p>
          </div>
        </div>

        <Button
          onClick={spin}
          disabled={isSpinning}
          size="lg"
          className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 border-0"
        >
          <RefreshCw className={`w-5 h-5 mr-2 ${isSpinning ? "animate-spin" : ""}`} />
          {isSpinning ? "Spinning..." : "Spin the Wheel"}
        </Button>
      </div>
    </Card>
  )
}
