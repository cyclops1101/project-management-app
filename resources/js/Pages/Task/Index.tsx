import ContentContainer from "@/Components/ContentContainer";
import Heading from "@/Components/Heading";
import TaskTable from "./Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, QueryParams, Task } from "@/types";
import { Head, router } from "@inertiajs/react";
import { LaravelPaginatedResource } from "laravel-resource-pagination-type";

type TaskProps = PageProps & {
  tasks: LaravelPaginatedResource<Task>;
  queryParams?: QueryParams | null;
};

export default function Index({ auth, tasks, queryParams = null }: TaskProps) {
  queryParams = queryParams || {};
  const refresh = (): void => {
    router.get(route("task.index"), queryParams);
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<Heading title="Tasks" />}>
      <Head title="Tasks" />
      <ContentContainer>
        <TaskTable tasks={tasks} queryParams={queryParams} refresh={refresh} />
      </ContentContainer>
    </AuthenticatedLayout>
  );
}
