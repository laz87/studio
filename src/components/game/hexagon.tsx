import { cn } from "@/lib/utils";

type HexagonProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export function Hexagon({ className, children, onClick }: HexagonProps) {
  return (
    <div
      className={cn("w-[100px] h-[115.47px] flex items-center justify-center transition-transform active:scale-90", className)}
      style={{
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
