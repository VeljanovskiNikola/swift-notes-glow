import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NewsletterSignupProps {
  compact?: boolean;
}

const NewsletterSignup = ({ compact = false }: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate">("idle");

  const validate = (value: string) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(email);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStatus("loading");

    const { error: dbError } = await supabase
      .from("subscribers")
      .insert({ email: email.trim().toLowerCase() });

    if (dbError) {
      if (dbError.code === "23505") {
        setStatus("duplicate");
      } else {
        setError("Something went wrong. Please try again.");
        setStatus("idle");
      }
      return;
    }
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 text-sm animate-fade-in ${compact ? "" : "justify-center py-4"}`}>
        <CheckCircle size={18} className="text-primary" />
        <span className="text-foreground">You're in! Check your inbox.</span>
      </div>
    );
  }

  if (status === "duplicate") {
    return (
      <div className={`flex items-center gap-2 text-sm animate-fade-in ${compact ? "" : "justify-center py-4"}`}>
        <CheckCircle size={18} className="text-primary" />
        <span className="text-foreground">You're already subscribed!</span>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          placeholder="your@email.com"
          className="h-9 px-3 text-sm rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-48"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-9 px-4 text-sm font-medium rounded-md bg-gradient-to-r from-primary to-[hsl(210,90%,55%)] text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "loading" ? "…" : "Subscribe"}
        </button>
        {error && <span className="text-xs text-destructive">{error}</span>}
      </form>
    );
  }

  return (
    <div className="gradient-border rounded-xl p-8 text-center animate-fade-in">
      <h3 className="text-xl font-bold mb-2">Stay in the loop</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Get new posts delivered to your inbox. No spam, unsubscribe anytime.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          placeholder="your@email.com"
          className="h-10 px-4 text-sm rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-full"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-10 px-6 text-sm font-medium rounded-md bg-gradient-to-r from-primary to-[hsl(210,90%,55%)] text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {error && <p className="text-xs text-destructive mt-3">{error}</p>}
    </div>
  );
};

export default NewsletterSignup;
