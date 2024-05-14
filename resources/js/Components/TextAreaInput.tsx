import { cn } from "@/lib/utils";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  InputHTMLAttributes,
} from "react";

export default forwardRef(function TextAreaInput(
  {
    children,
    className = "",
    isFocused = false,
    ...props
  }: InputHTMLAttributes<HTMLTextAreaElement> & { isFocused?: boolean },
  ref
) {
  const localRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, []);

  return (
    <textarea
      {...props}
      className={cn(
        "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm px-3 py-2",
        className
      )}
      ref={localRef}
    >{children}</textarea>
  );
});
