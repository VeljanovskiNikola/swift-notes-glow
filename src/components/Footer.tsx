import { Github, Twitter, Linkedin } from "lucide-react";
import NewsletterSignup from "@/components/NewsletterSignup";

const Footer = () => (
  <footer className="mt-20">
    <div className="glow-line opacity-40" />
    <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-6 text-center">
      <NewsletterSignup />
      </div>
      <div className="flex items-center gap-4">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
          <Github size={18} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
          <Twitter size={18} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
        <p className="text-sm text-muted-foreground">© 2026 Nikola Veljanovski. All rights reserved.</p>
      </div>
  </footer>
);

export default Footer;
