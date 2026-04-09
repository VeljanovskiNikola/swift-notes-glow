export interface Project {
  name: string;
  description: string;
  tags: string[];
  github: string;
}

export const projects: Project[] = [
  {
    name: "Pulse",
    description: "A lightweight, privacy-focused analytics SDK for iOS apps. Built with Swift concurrency and on-device aggregation.",
    tags: ["Swift", "iOS SDK", "Privacy"],
    github: "https://github.com",
  },
  {
    name: "Compose",
    description: "A SwiftUI component library implementing Material Design 3 tokens with native Apple platform conventions.",
    tags: ["SwiftUI", "Design System", "Open Source"],
    github: "https://github.com",
  },
  {
    name: "Synth",
    description: "A real-time audio synthesizer app exploring CoreAudio and MIDI integration with a SwiftUI-driven interface.",
    tags: ["CoreAudio", "MIDI", "SwiftUI"],
    github: "https://github.com",
  },
  {
    name: "Relay",
    description: "An async networking layer built on top of URLSession with automatic retry, caching, and request deduplication.",
    tags: ["Networking", "Concurrency", "Swift Package"],
    github: "https://github.com",
  },
];
