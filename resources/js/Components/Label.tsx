import { cn } from "@/lib/utils";

type LabelProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function Label({children, title, className}: LabelProps) {
  return (
    <div className={cn("mt-4", className)}>
      <label className="font-bold text-lg">{title}</label>
      <p className="mt-1">{children}</p>
    </div>
  );
}
