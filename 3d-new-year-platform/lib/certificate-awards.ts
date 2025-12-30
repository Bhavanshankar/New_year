export interface AwardType {
  value: string
  label: string
  description: string
  category: "social" | "reliability" | "humor" | "family" | "tech" | "achievement"
}

export const certificateAwards: AwardType[] = [
  {
    value: "megaphone",
    label: "Human Megaphone",
    description: "Loudest and most enthusiastic celebrator",
    category: "social",
  },
  {
    value: "tracker",
    label: "Birthday Tracker",
    description: "Never misses an important milestone",
    category: "reliability",
  },
  {
    value: "buzzword",
    label: "Buzzwordaholic",
    description: "Master of corporate jargon at dinner tables",
    category: "humor",
  },
  {
    value: "snacks",
    label: "Keeper of the Snacks",
    description: "Guardian of the best treats during celebrations",
    category: "family",
  },
  {
    value: "ducttape",
    label: "Duct Tape Award",
    description: "Can fix any technical glitch at parties",
    category: "tech",
  },
  {
    value: "champion",
    label: "2026 Champion",
    description: "Ready to conquer the year ahead with determination",
    category: "achievement",
  },
  {
    value: "legend",
    label: "Party Legend",
    description: "Life of every celebration and gatherings",
    category: "social",
  },
  {
    value: "visionary",
    label: "Future Visionary",
    description: "Always thinking three steps ahead into the future",
    category: "achievement",
  },
  {
    value: "organizer",
    label: "Master Organizer",
    description: "Coordinates events with military precision",
    category: "reliability",
  },
  {
    value: "storyteller",
    label: "Epic Storyteller",
    description: "Turns every moment into an unforgettable tale",
    category: "social",
  },
]

export function getAwardByValue(value: string): AwardType | undefined {
  return certificateAwards.find((award) => award.value === value)
}

export function getAwardsByCategory(category: AwardType["category"]): AwardType[] {
  return certificateAwards.filter((award) => award.category === category)
}
