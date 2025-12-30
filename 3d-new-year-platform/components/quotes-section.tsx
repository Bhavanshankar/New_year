"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight, Heart, Sparkles, Laugh, Briefcase, Users } from "lucide-react"

const quotes = {
  heartwarming: [
    {
      text: "Family is not just an important thing. It's everything. Here's to creating beautiful memories together in 2026.",
      author: "Michael J. Fox",
      icon: Users,
    },
    {
      text: "In 2026, may your home be filled with love, laughter, and the warmth of family bonds that grow stronger with each passing day.",
      author: "Anonymous",
      icon: Heart,
    },
    {
      text: "The love of family is life's greatest blessing. May 2026 bring you closer to those who matter most.",
      author: "Traditional Wisdom",
      icon: Users,
    },
  ],
  motivational: [
    {
      text: "You have 365 blank pages ahead. This is your year to write an incredible story. Make every chapter count.",
      author: "Unknown",
      icon: Sparkles,
    },
    {
      text: "The new year stands before us, like a chapter in a book, waiting to be written. Write a good one.",
      author: "Melody Beattie",
      icon: Sparkles,
    },
    {
      text: "2026 is your blank canvas. Paint it with courage, ambition, and the colors of your wildest dreams.",
      author: "Inspired Wisdom",
      icon: Sparkles,
    },
  ],
  humorous: [
    {
      text: "My New Year's resolution is to stop pretending I'll stick to my New Year's resolutions.",
      author: "Every January Ever",
      icon: Laugh,
    },
    {
      text: "2026: The year I finally accept that Crocs are formal wear and my obsession with avocado toast is永久的.",
      author: "Modern Millennial",
      icon: Laugh,
    },
    {
      text: "New Year's Day: A fresh start! January 2nd: Back to forgetting what day it is.",
      author: "Reality Check",
      icon: Laugh,
    },
  ],
  romantic: [
    {
      text: "As the calendar changes, my love for you remains constant. Here's to another year of our beautiful journey together.",
      author: "Love Letter",
      icon: Heart,
    },
    {
      text: "With you, every year is my favorite year. Happy 2026 to us, my forever.",
      author: "Romantic Soul",
      icon: Heart,
    },
    {
      text: "365 days, 8,760 hours, 525,600 minutes to love you more deeply. Happy New Year, my love.",
      author: "Counting Love",
      icon: Heart,
    },
  ],
  professional: [
    {
      text: "May 2026 bring prosperity to your ventures, success to your goals, and unity to your team.",
      author: "Business Wisdom",
      icon: Briefcase,
    },
    {
      text: "Together we achieve more. Here's to reaching new heights and smashing targets in 2026.",
      author: "Team Spirit",
      icon: Briefcase,
    },
    {
      text: "Success is not the destination, it's the journey we take together. Let's make 2026 extraordinary.",
      author: "Leadership Insight",
      icon: Briefcase,
    },
  ],
}

export default function QuotesSection() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof quotes>("motivational")
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentQuotes = quotes[selectedCategory]
  const currentQuote = currentQuotes[currentIndex]
  const IconComponent = currentQuote.icon

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % currentQuotes.length)
  }

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + currentQuotes.length) % currentQuotes.length)
  }

  const categories = [
    { key: "motivational", label: "Motivational", icon: Sparkles },
    { key: "heartwarming", label: "Family", icon: Users },
    { key: "humorous", label: "Humorous", icon: Laugh },
    { key: "romantic", label: "Romantic", icon: Heart },
    { key: "professional", label: "Professional", icon: Briefcase },
  ] as const

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Beloved Quotes for 2026</h2>
          <p className="text-white/60 text-lg">Find the perfect words to inspire and celebrate</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => {
                setSelectedCategory(key as keyof typeof quotes)
                setCurrentIndex(0)
              }}
              variant={selectedCategory === key ? "default" : "outline"}
              className={
                selectedCategory === key
                  ? "bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 border-0"
                  : "border-white/20 text-white/70 hover:text-white hover:border-white/40 bg-white/5 backdrop-blur-sm"
              }
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>

        <Card className="relative overflow-hidden bg-white/10 backdrop-blur-xl border-white/20 text-white p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-rose-500/10" />

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <IconComponent className="w-12 h-12 text-amber-400" />
            </div>

            <blockquote className="text-2xl md:text-3xl font-light text-center leading-relaxed mb-6 text-balance">
              "{currentQuote.text}"
            </blockquote>

            <p className="text-center text-white/60 text-lg">— {currentQuote.author}</p>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                onClick={prevQuote}
                variant="outline"
                size="icon"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-2">
                {currentQuotes.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex ? "bg-amber-400 w-8" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextQuote}
                variant="outline"
                size="icon"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
