import { cn } from "@/lib/utils";

type HexagonProps = {
  className?: string;
  children?: React.ReactNode;
};

export function Hexagon({ className, children }: HexagonProps) {
  return (
    <div
      className={cn("w-[100px] h-[115.47px] flex items-center justify-center", className)}
      style={{
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      }}
    >
      {children}
    </div>
  );
}
