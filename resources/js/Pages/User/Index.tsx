import ContentContainer from "@/Components/ContentContainer";
import Heading from "@/Components/Heading";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User, QueryParams } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { LaravelPaginatedResource } from "laravel-resource-pagination-type";
import UserTable from "./Table";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

type UserProps = PageProps & {
  users: LaravelPaginatedResource<User>;
  queryParams?: QueryParams | null;
  success?: string;
};

export default function Index({
  auth,
  users,
  queryParams = null,
  success,
}: UserProps) {
  queryParams = queryParams || {};
  const refresh = (): void => {
    router.get(route("user.index"), queryParams);
  };

  success && toast.success(success);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <Heading title="Users" />
          <Link href={route("user.create")} className="flex items-center">
            <Button variant="secondary">
              Create
              <PlusIcon />
            </Button>
          </Link>
        </div>
      }
    >
      <Head title={`User`} />
      <ContentContainer>
        <UserTable {...{ users, queryParams, refresh }} />
      </ContentContainer>
    </AuthenticatedLayout>
  );
}
