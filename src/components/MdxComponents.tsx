import { useRef, useEffect, useState, type ReactNode, type ReactElement } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-swift";
import CopyButton from "./CopyButton";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in (node as ReactElement)) {
    return extractText((node as ReactElement).props.children);
  }
  return "";
}

function CodeBlock({ children, ...props }: { children?: ReactNode }) {
  const codeChild = children as ReactElement | undefined;
  const className = codeChild?.props?.className || "";
  const lang = className.replace("language-", "") || "swift";
  const label = lang.charAt(0).toUpperCase() + lang.slice(1);
  const code = extractText(codeChild?.props?.children || "").trim();
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <div className="code-block-wrapper relative">
      <div className="code-block-header">
        <span>{label}</span>
      </div>
      <CopyButton code={code} />
      <pre className={`language-${lang}`} {...props}>
        <code ref={codeRef} className={`language-${lang}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}

export const mdxComponents = {
  pre: CodeBlock,
};
