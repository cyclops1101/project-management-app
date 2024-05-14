import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

type ToastType = {
  type: "success" | "error" | "loading" | null;
  message: string;
}

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { props } = usePage();

  const toasted = props.toasted as ToastType;

  useEffect(() => {
    if (toasted) {
      switch (toasted.type) {
        case "success":
          toast.success(toasted.message);
          break;
        case "error":
          toast.error(toasted.message);
          break;
        case "loading":
          toast.loading(toasted.message);
          break;
        default:
          toast(toasted.message);
          break;
      }
    }
  }, [toasted]);

  return (
    <>
      <Toaster position="top-right"/>
      {children}
    </>
  );
};

export default ToastProvider;
