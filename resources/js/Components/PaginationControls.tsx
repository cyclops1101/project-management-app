import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { LaravelPaginationControlLinks } from "laravel-resource-pagination-type";

type PaginationControlsProps = {
  links: LaravelPaginationControlLinks[];
};

export default function PaginationControls({
  links,
}: PaginationControlsProps) {

  return (
    <nav className="text-center my-4 space-x-2">
      {links.map((link) => (
        <Link
          preserveScroll
          key={link.label}
          href={link.url || "#"}
          className={cn(
            "inline-block py-2 px-3 rounded-lg text-gray-200 text-xs",
            {
              "bg-gray-950": link.active,
              "!text-gray-500 cursor-not-allowed hover:text-gray-950":
                !link.url,
            }
          )}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </nav>
  );
}
