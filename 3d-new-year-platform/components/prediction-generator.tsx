"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Sparkles, Wand2 } from "lucide-react"

const predictionCategories = {
  fashion: ["Socks with sandals become runway staples", "Fanny packs are now evening wear", "Holographic everything"],
  food: [
    "Pickle-flavored ice cream goes viral",
    "Breakfast pizza for dinner becomes acceptable",
    "Oat milk finally defeats almond milk",
  ],
  tech: [
    "AI writes better thank you notes than humans",
    "Smart fridges start judging your late-night snacks",
    "Everyone has a personal robot assistant",
  ],
  lifestyle: [
    "4-day work weeks become the norm",
    "Napping at your desk is actively encouraged",
    "Your daily Roman Empire thought becomes a national statistic",
  ],
  social: [
    "Saying 'love you' to coworkers by accident becomes socially acceptable",
    "Video calls require formal lower-half attire",
    "Everyone masters the art of the Irish goodbye",
  ],
  culture: [
    "Crocs are now considered formal wear",
    "Streaming services have streaming services",
    "The word 'adulting' is officially added to the dictionary",
  ],
}

export default function PredictionGenerator() {
  const [prediction, setPrediction] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const categories = Object.keys(predictionCategories)
      const randomCategory = categories[Math.floor(Math.random() * categories.length)]
      const predictions = predictionCategories[randomCategory as keyof typeof predictionCategories]
      const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)]

      setCategory(randomCategory)
      setPrediction(randomPrediction)
      setIsGenerating(false)
    }, 1000)
  }

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white p-8">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-amber-400" />
          <h3 className="text-2xl font-bold">2026 Prediction Generator</h3>
        </div>

        <p className="text-white/70 text-center max-w-xl">
          What does the future hold? Generate hilarious and oddly specific predictions for the year ahead.
        </p>

        <div className="w-full max-w-2xl min-h-[180px] flex items-center justify-center">
          {!prediction && !isGenerating && (
            <div className="text-center text-white/50 text-lg">Click the button to reveal your 2026 prediction...</div>
          )}

          {isGenerating && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Wand2 className="w-12 h-12 text-amber-400 animate-spin" />
              </div>
              <p className="text-xl text-white/70">Consulting the cosmic algorithm...</p>
            </div>
          )}

          {prediction && !isGenerating && (
            <div className="text-center space-y-4 animate-in fade-in duration-500">
              <div className="flex justify-center">
                <span className="px-4 py-1 rounded-full text-sm bg-amber-500/20 text-amber-300">
                  {category?.charAt(0).toUpperCase()}
                  {category?.slice(1)} Prediction
                </span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-amber-400 leading-relaxed text-balance">{prediction}</p>
            </div>
          )}
        </div>

        <Button
          onClick={generate}
          disabled={isGenerating}
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0"
        >
          <Wand2 className="w-5 h-5 mr-2" />
          {isGenerating ? "Generating..." : prediction ? "Generate Another" : "Generate Prediction"}
        </Button>
      </div>
    </Card>
  )
}
