type BalanceIconProps = {
  className?: string;
  animate?: boolean;
};

const SHAPES: {
  el: "line" | "circle" | "path";
  props: Record<string, string | number>;
  delay: number;
}[] = [
  { el: "line", props: { x1: 50, y1: 10, x2: 50, y2: 88 }, delay: 0 },
  { el: "line", props: { x1: 22, y1: 24, x2: 78, y2: 24 }, delay: 150 },
  { el: "line", props: { x1: 22, y1: 24, x2: 22, y2: 52 }, delay: 300 },
  { el: "line", props: { x1: 78, y1: 24, x2: 78, y2: 52 }, delay: 300 },
  { el: "path", props: { d: "M10,52 Q22,66 34,52" }, delay: 500 },
  { el: "path", props: { d: "M66,52 Q78,66 90,52" }, delay: 500 },
  { el: "line", props: { x1: 50, y1: 88, x2: 34, y2: 88 }, delay: 650 },
  { el: "line", props: { x1: 50, y1: 88, x2: 66, y2: 88 }, delay: 650 },
  { el: "circle", props: { cx: 50, cy: 24, r: 2.5 }, delay: 700 },
];

export default function BalanceIcon({ className, animate = false }: BalanceIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      {SHAPES.map(({ el: El, props, delay }, i) => (
        <El
          key={i}
          {...props}
          pathLength={animate ? 1 : undefined}
          className={animate ? "balance-draw" : undefined}
          style={animate ? { animationDelay: `${delay}ms` } : undefined}
        />
      ))}
    </svg>
  );
}
