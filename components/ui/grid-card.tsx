import * as React from "react";

import { cn } from "@/lib/utils";

const GridCard = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "block",
        "relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-4 text-white transition-all duration-300 hover:border-cyan-200/35 hover:bg-white/[0.08]",
        "before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] before:bg-[size:18px_18px] before:opacity-0 before:transition-opacity hover:before:opacity-100",
        className,
      )}
      {...props}
    />
  ),
);
GridCard.displayName = "GridCard";

export { GridCard };
