import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border mt-20">
    <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">© 2026 Swift Notes</p>
      <div className="flex items-center gap-4">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
          <Github size={18} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
          <Twitter size={18} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
