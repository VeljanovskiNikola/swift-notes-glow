const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  SwiftUI:       { bg: "rgba(10,132,255,0.2)",  text: "#0A84FF" },
  Concurrency:   { bg: "rgba(191,90,242,0.2)",  text: "#BF5AF2" },
  Architecture:  { bg: "rgba(255,159,10,0.2)",  text: "#FF9F0A" },
  Career:        { bg: "rgba(48,209,88,0.2)",   text: "#30D158" },
  UIKit:         { bg: "rgba(255,69,58,0.2)",   text: "#FF453A" },
  "Music & Code":{ bg: "rgba(255,55,95,0.2)",   text: "#FF375F" },
  Swift:         { bg: "rgba(191,90,242,0.2)",   text: "#BF5AF2" },
};

const DEFAULT = { bg: "hsl(211 100% 52% / 0.15)", text: "hsl(211 100% 65%)" };

export function getTagStyle(tag: string) {
  const c = TAG_COLORS[tag] ?? DEFAULT;
  return { backgroundColor: c.bg, color: c.text } as const;
}
