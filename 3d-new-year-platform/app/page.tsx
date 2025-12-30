"use client"

import { useState } from "react"
import Hero3D from "@/components/hero-3d"
import QuotesSection from "@/components/quotes-section"
import GamesSection from "@/components/games-section"
import CertificateSection from "@/components/certificate-section"
import { Sparkles } from "lucide-react"

export default function Home() {
  const [showMainContent, setShowMainContent] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a0a2e] to-[#0f0520]">
      <Hero3D onEnter={() => setShowMainContent(true)} />

      {showMainContent && (
        <div className="relative z-10">
          <QuotesSection />
          <GamesSection />
          <CertificateSection />

          <footer className="py-12 text-center text-white/60 border-t border-white/10">
            <div className="container mx-auto px-4">
              <p className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Celebrating 2026 with Innovation
                <Sparkles className="w-4 h-4" />
              </p>
            </div>
          </footer>
        </div>
      )}
    </main>
  )
}
