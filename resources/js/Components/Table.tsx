import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Table({ children, className }: Props) {
  return (
    <table
      className={cn(
        "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",
        className
      )}
    >
      {children}
    </table>
  );
}

export function TableHead({ children, className }: Props) {
  return (
    <thead
      className={cn(
        "bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-500",
        className
      )}
    >
      {children}
    </thead>
  );
}

export function TableBody({ children, className }: Props) {
  return <tbody className={cn(className)}>{children}</tbody>;
}

export function TableRow({ children, className }: Props) {
  return <tr className={cn("text-nowrap border-b border-b-gray-500 last:border-b-0 ", className)}>{children}</tr>;
}

export default function TableDiv({ children, className }: Props) {
  return <td className={cn("px-3 py-2", className)}>{children}</td>;
}

type TableHeadingProps = {
  column: { name: string; key: string };
  sortable: boolean;
  onClick: () => void;
  sortBy: string | undefined;
  order: string | undefined;
};

export function TableHeading({
  column,
  sortable,
  onClick,
  sortBy,
  order,
}: TableHeadingProps) {
  return (
    <th onClick={(e) => sortable && onClick()} key={column.key}>
      <span
        className={cn("px-3 py-2 flex gap-x-1 items-center justify-between", {
          "cursor-pointer": sortable,
        })}
      >
        {column.name}
        {sortable && (
          <span className="flex flex-col">
            <ChevronUpIcon
              className={cn(
                "w-4",
                order === "desc" && sortBy === column.key
                  ? "text-white"
                  : "text-gray-400"
              )}
            />
            <ChevronDownIcon
              className={cn(
                "w-4 -mt-2",
                order === "asc" && sortBy === column.key
                  ? "text-white"
                  : "text-gray-400"
              )}
            />
          </span>
        )}
      </span>
    </th>
  );
}
