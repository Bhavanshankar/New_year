"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Grid3x3, RefreshCw } from "lucide-react"

const bingoItems = [
  "Someone says 'New Year, New Me'",
  "Fireworks go off at midnight",
  "Someone makes a toast",
  "Champagne is popped",
  "Someone kisses at midnight",
  "Resolution is made and forgotten",
  "Someone checks their phone at midnight",
  "Auld Lang Syne plays",
  "Someone takes a selfie",
  "Confetti everywhere",
  "Someone mentions 2025",
  "Countdown from 10",
  "Someone wears a party hat",
  "Group photo is taken",
  "Someone spills a drink",
  "Late arrival after midnight",
  "Someone cries happy tears",
  "Dance party breaks out",
  "Someone falls asleep before midnight",
  "Someone checks their ex's social media",
  "Resolution involves gym membership",
  "Someone says 'Time flies'",
  "Sparklers are lit",
  "Someone makes a wish",
  "Someone double-dips the chips",
]

export default function VirtualBingo() {
  const [board, setBoard] = useState<string[]>([])
  const [marked, setMarked] = useState<Set<number>>(new Set())

  const generateBoard = () => {
    const shuffled = [...bingoItems].sort(() => Math.random() - 0.5)
    setBoard(shuffled.slice(0, 25))
    setMarked(new Set([12])) // Center square is free
  }

  const toggleMark = (index: number) => {
    const newMarked = new Set(marked)
    if (newMarked.has(index)) {
      if (index !== 12) newMarked.delete(index) // Don't unmark free space
    } else {
      newMarked.add(index)
    }
    setMarked(newMarked)
  }

  const checkBingo = () => {
    if (board.length === 0) return false

    // Check rows
    for (let i = 0; i < 5; i++) {
      if ([0, 1, 2, 3, 4].every((j) => marked.has(i * 5 + j))) return true
    }

    // Check columns
    for (let i = 0; i < 5; i++) {
      if ([0, 1, 2, 3, 4].every((j) => marked.has(j * 5 + i))) return true
    }

    // Check diagonals
    if ([0, 1, 2, 3, 4].every((i) => marked.has(i * 5 + i))) return true
    if ([0, 1, 2, 3, 4].every((i) => marked.has(i * 5 + (4 - i)))) return true

    return false
  }

  const hasBingo = checkBingo()

  if (board.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white p-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center gap-3">
            <Grid3x3 className="w-8 h-8 text-amber-400" />
            <h3 className="text-2xl font-bold">New Year's Eve Bingo</h3>
          </div>

          <p className="text-white/70 text-center max-w-xl">
            Generate your personalized bingo board and mark off items as they happen during your celebration. First to
            get five in a row wins!
          </p>

          <Button
            onClick={generateBoard}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 border-0"
          >
            <Grid3x3 className="w-5 h-5 mr-2" />
            Generate Bingo Board
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white p-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Grid3x3 className="w-8 h-8 text-amber-400" />
            <h3 className="text-2xl font-bold">New Year's Eve Bingo</h3>
          </div>

          <Button
            onClick={generateBoard}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            New Board
          </Button>
        </div>

        {hasBingo && (
          <div className="bg-gradient-to-r from-amber-500 to-rose-500 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold">BINGO! You win!</p>
          </div>
        )}

        <div className="grid grid-cols-5 gap-2">
          {board.map((item, index) => (
            <button
              key={index}
              onClick={() => toggleMark(index)}
              className={`
                aspect-square p-2 rounded-lg text-xs md:text-sm font-medium transition-all
                flex items-center justify-center text-center leading-tight
                ${
                  marked.has(index)
                    ? "bg-gradient-to-br from-amber-500 to-rose-500 text-white shadow-lg scale-95"
                    : "bg-white/10 hover:bg-white/20 text-white/80"
                }
                ${index === 12 && !marked.has(12) ? "bg-green-500/30" : ""}
              `}
            >
              {index === 12 ? "FREE" : item}
            </button>
          ))}
        </div>

        <p className="text-white/60 text-sm text-center">
          Click squares to mark them. Get 5 in a row (horizontal, vertical, or diagonal) to win!
        </p>
      </div>
    </Card>
  )
}
