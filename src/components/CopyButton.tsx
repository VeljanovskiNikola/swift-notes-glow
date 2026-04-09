import { useState, useCallback } from "react";
import { Clipboard, Check } from "lucide-react";

const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <button
      onClick={handleCopy}
      className="copy-btn absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 border border-border bg-[#2a2a2c] hover:bg-[#3a3a3c]"
      aria-label="Copy code"
    >
      {copied ? (
        <>
          <Check size={13} className="text-green-400" />
          <span className="text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <Clipboard size={13} className="text-muted-foreground" />
          <span className="text-muted-foreground">Copy</span>
        </>
      )}
    </button>
  );
};

export default CopyButton;
