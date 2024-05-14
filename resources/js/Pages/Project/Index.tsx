import ContentContainer from "@/Components/ContentContainer";
import Heading from "@/Components/Heading";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Project, QueryParams } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { LaravelPaginatedResource } from "laravel-resource-pagination-type";
import ProjectTable from "./Table";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

type ProjectProps = PageProps & {
  projects: LaravelPaginatedResource<Project>;
  queryParams?: QueryParams | null;
  success?: string;
};

export default function Index({
  auth,
  projects,
  queryParams = null,
  success,
}: ProjectProps) {
  queryParams = queryParams || {};
  const refresh = (): void => {
    router.get(route("project.index"), queryParams);
  };

  success && toast.success(success);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <Heading title="Projects" />
          <Link href={route("project.create")} className="flex items-center">
            <Button variant="secondary">
              Create
              <PlusIcon />
            </Button>
          </Link>
        </div>
      }
    >
      <Head title={`Project`} />
      <ContentContainer>
        <ProjectTable {...{ projects, queryParams, refresh }} />
      </ContentContainer>
    </AuthenticatedLayout>
  );
}
