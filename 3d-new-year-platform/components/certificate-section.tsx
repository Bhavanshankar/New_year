"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Award, Download, Loader2 } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { certificateAwards } from "@/lib/certificate-awards"

export default function CertificateSection() {
  const [name, setName] = useState("")
  const [awardType, setAwardType] = useState(certificateAwards[0].value)
  const [isGenerating, setIsGenerating] = useState(false)

  const selectedAward = certificateAwards.find((a) => a.value === awardType) || certificateAwards[0]

  const generatePDF = async () => {
    if (!name.trim()) {
      alert("Please enter your name")
      return
    }

    setIsGenerating(true)

    try {
      const certificateElement = document.getElementById("certificate-preview")
      if (!certificateElement) return

      // Capture the certificate as canvas with high quality
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        backgroundColor: "#0a0118",
        logging: false,
      })

      // Create PDF in landscape orientation
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 297 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`2026-Certificate-${name.replace(/\s+/g, "-")}.pdf`)
    } catch (error) {
      console.error("[v0] Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get Your 2026 Certificate</h2>
          <p className="text-white/60 text-lg">Create a personalized award to celebrate the year ahead</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white p-6 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold">Customize Your Certificate</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80">
                  Your Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="award" className="text-white/80">
                  Award Type
                </Label>
                <Select value={awardType} onValueChange={setAwardType}>
                  <SelectTrigger
                    id="award"
                    className="bg-white/10 border-white/20 text-white data-[placeholder]:text-white/40 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a0a2e] border-white/20 text-white">
                    {certificateAwards.map((award) => (
                      <SelectItem key={award.value} value={award.value} className="hover:bg-white/10">
                        <div>
                          <div className="font-medium">{award.label}</div>
                          <div className="text-sm text-white/60">{award.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={generatePDF}
                disabled={isGenerating || !name.trim()}
                size="lg"
                className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 border-0"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Download Certificate
                  </>
                )}
              </Button>
            </div>
          </Card>

          <Card
            id="certificate-preview"
            className="relative overflow-hidden bg-gradient-to-br from-[#1a0a2e] to-[#0a0118] border-4 border-amber-400/30 p-8 md:p-12 text-white"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-amber-400 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-rose-400 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center">
                <Award className="w-10 h-10 text-white" />
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-amber-400">Certificate of Excellence</h3>
                <p className="text-white/70 text-sm">Celebrating 2026</p>
              </div>

              <div className="space-y-4 py-6">
                <p className="text-lg text-white/80">This certifies that</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                  {name || "Your Name Here"}
                </p>
                <p className="text-lg text-white/80">has earned the prestigious title of</p>
                <p className="text-2xl font-bold text-amber-300">{selectedAward.label}</p>
                <p className="text-sm text-white/60 italic max-w-sm">{selectedAward.description}</p>
              </div>

              <div className="pt-6 border-t border-white/20 w-full space-y-2">
                <p className="text-sm text-white/60">Awarded on New Year's 2026</p>
                <div className="flex justify-between items-center px-8">
                  <div className="text-center">
                    <div className="w-32 h-px bg-white/30 mb-1" />
                    <p className="text-xs text-white/50">Signature</p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-px bg-white/30 mb-1" />
                    <p className="text-xs text-white/50">Date</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm">
            Your certificate is generated privately in your browser. No data is sent to any server.
          </p>
        </div>
      </div>
    </section>
  )
}
