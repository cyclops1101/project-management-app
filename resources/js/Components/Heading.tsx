import { cn } from "@/lib/utils";

type HeadingProps = {
  title: string;
  className?: string;
};

export default function Heading({ title, className }: HeadingProps) {
  return (
    <h2
      className={cn(
        "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",
        className
      )}
    >
      {title}
    </h2>
  );
}
