import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: Props) {
  const ref = useReveal<HTMLDivElement>();
  const style: CSSProperties = delay
    ? { transitionDelay: `${delay}ms` }
    : {};

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
