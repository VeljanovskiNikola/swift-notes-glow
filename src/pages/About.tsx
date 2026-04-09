import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Smartphone, Zap, Layers, Music } from "lucide-react";

const topics = [
  { icon: Smartphone, label: "iOS Development", desc: "Building native experiences for Apple platforms" },
  { icon: Zap, label: "Swift Concurrency", desc: "async/await, actors, and structured concurrency" },
  { icon: Layers, label: "App Architecture", desc: "MVVM, composable patterns, and clean code" },
  { icon: Music, label: "Music & Code", desc: "Intersections of creativity and engineering" },
];

const About = () => (
  <>
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-8 max-w-[680px]">
      <div className="flex flex-col sm:flex-row gap-6 items-start mb-12">
        <div className="w-24 h-24 rounded-full bg-card border border-border flex items-center justify-center text-3xl font-bold text-primary shrink-0">
          SN
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">About</h1>
          <p className="text-muted-foreground leading-relaxed mb-3">
            I'm an iOS developer passionate about building thoughtful, performant software. I write about Swift, SwiftUI, app architecture, and the creative side of programming.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            By day I work on consumer-facing iOS apps. By night I tinker with synthesizers, read about type theory, and occasionally ship open-source Swift packages.
          </p>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-6">What I write about</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topics.map((t, i) => (
          <div
            key={t.label}
            className="bg-card rounded-lg p-4 border border-border opacity-0 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <t.icon size={18} className="text-primary" />
              <span className="font-medium text-foreground">{t.label}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t.desc}</p>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </>
);

export default About;
