import { cn } from "@/lib/utils";

type ContentContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentContainer({
  children,
  className,
}: ContentContainerProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg",
        className
      )}
    >
      <div className="text-gray-900 dark:text-gray-100">{children}</div>
    </div>
  );
}
