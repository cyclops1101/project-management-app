import { Button } from "@/components/ui/button";
import { Link, router, usePage } from "@inertiajs/react";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

type ActionLinksProps = {
  id: number;
  resource: string;
  redirect?: string;
};

export default function ActionLinks({ id, resource, redirect }: ActionLinksProps) {
  const destroy = () => {
    if (confirm("Are you sure you want to delete this item?")) {
      router.delete(route(`${resource}.destroy`, id),{
        data: {
          redirect
        }
      });
    }
  };

  return (
    <div className="flex justify-center gap-x-1 align-items-center h-full">
      <Link href={route(`${resource}.edit`, id)}>
        <Button>
          <Pencil2Icon />
        </Button>
      </Link>
      <Button variant="destructive" onClick={destroy}>
        <TrashIcon />
      </Button>
    </div>
  );
}
