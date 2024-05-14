import ActionLinks from "@/Components/ActionLinks";
import ContentContainer from "@/Components/ContentContainer";
import Heading from "@/Components/Heading";
import Label from "@/Components/Label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, QueryParams, Task, User } from "@/types";
import { Head, router } from "@inertiajs/react";
import { LaravelPaginatedResource } from "laravel-resource-pagination-type";
import TaskTable from "../Task/Table";

type ShowProps = PageProps & {
  user: User;
  tasks: LaravelPaginatedResource<Task>;
  queryParams: QueryParams;
  success?: string;
};

export default function Show({
  auth,
  user,
  tasks,
  queryParams,
}: ShowProps) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <Heading title={`User: ${user.name}`} />
          <ActionLinks resource="user" id={user.id} />
        </div>
      }
    >
      <Head title={user.name} />
      <ContentContainer>

        <div className="p-4">
          <div className="grid grid-cols-2 gap-1">
            <div>
              <Label title="User Name">{user.name}</Label>
            </div>
            <div>
              <Label title="Email">{user.email}</Label>
              <Label title="Created At">{user.created_at}</Label>
            </div>
          </div>
        </div>
      </ContentContainer>
      <Heading title="Tasks" className="mt-6" />
      <ContentContainer className="mt-4">
        <TaskTable
          {...{ tasks, queryParams }}
          hideName
          refresh={() => router.get(route("user.show", user.id))}
        />
      </ContentContainer>
    </AuthenticatedLayout>
  );
}
