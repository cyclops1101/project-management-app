import ActionLinks from "@/Components/ActionLinks";
import ContentContainer from "@/Components/ContentContainer";
import Heading from "@/Components/Heading";
import Label from "@/Components/Label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PageProps, Task, QueryParams, User } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { LaravelPaginatedResource } from "laravel-resource-pagination-type";
import TaskTable from "../Task/Table";

type ShowProps = PageProps & {
  task: Task;
  queryParams: QueryParams;
  success?: string;
};

export default function Show({ auth, task, queryParams }: ShowProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <Heading title={`Task: ${task.name}`} />
          <ActionLinks resource="task" id={task.id} />
        </div>
      }
    >
      <Head title={task.name} />
      <ContentContainer>
        <img
          src={task.image_path}
          alt={task.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <div className="grid grid-cols-2 gap-1">
            <div>
              <Label title="Task ID">{task.id}</Label>
              <Label title="Task Name">{task.name}</Label>
              <Label title="Task Status">
                <span
                  className={cn("bubble", TASK_STATUS_CLASS_MAP[task.status])}
                >
                  {TASK_STATUS_TEXT_MAP[task.status]}
                </span>
              </Label>
              <Label title="Due Date">{task.due_date}</Label>
            </div>
            <div>
              <Label title="Project">
                <Link href={route("project.show", task.project.id)}>
                  {task.project.name}
                </Link>
              </Label>
              <Label title="Assignee">
                {task.assignee === null ? (
                  "Unassigned"
                ) : (
                  <Link href={route("user.show", (task.assignee as User)?.id)}>
                    {(task.assignee as User)?.name}
                  </Link>
                )}
              </Label>
              <Label title="Created At">{task.created_at}</Label>
              <Label title="Creator">{task.creator.name}</Label>
              <Label title="Last Updated By">{task.updater.name}</Label>
            </div>
          </div>
          <Label title="Description">{task.description}</Label>
        </div>
      </ContentContainer>
    </AuthenticatedLayout>
  );
}
