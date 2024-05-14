import { cn } from "@/lib/utils";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  SelectHTMLAttributes,
} from "react";

export default forwardRef(function SelectInput(
  {
    children,
    className = "",
    options,
    ...props
  }: SelectHTMLAttributes<HTMLSelectElement> & {
    children?: React.ReactNode;
    options?: { label: string; value: string | number }[];
  },
  ref
) {
  const localRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  return (
    <select
      {...props}
      className={cn(
        "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm px-3 py-[.6rem]",
        className
      )}
      ref={localRef}
    >
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      {children}
    </select>
  );
});
