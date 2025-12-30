"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Dices, Sparkles, Grid3x3 } from "lucide-react"
import ResolutionRoulette from "./resolution-roulette"
import PredictionGenerator from "./prediction-generator"
import VirtualBingo from "./virtual-bingo"

export default function GamesSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#1a0a2e] to-[#0a0118]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Interactive 2026 Games</h2>
          <p className="text-white/60 text-lg">Celebrate with fun and engaging activities</p>
        </div>

        <Tabs defaultValue="roulette" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/10 backdrop-blur-sm border-white/20">
            <TabsTrigger value="roulette" className="data-[state=active]:bg-amber-500/80">
              <Dices className="w-4 h-4 mr-2" />
              Roulette
            </TabsTrigger>
            <TabsTrigger value="predictions" className="data-[state=active]:bg-amber-500/80">
              <Sparkles className="w-4 h-4 mr-2" />
              Predictions
            </TabsTrigger>
            <TabsTrigger value="bingo" className="data-[state=active]:bg-amber-500/80">
              <Grid3x3 className="w-4 h-4 mr-2" />
              Bingo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roulette">
            <ResolutionRoulette />
          </TabsContent>

          <TabsContent value="predictions">
            <PredictionGenerator />
          </TabsContent>

          <TabsContent value="bingo">
            <VirtualBingo />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
