import ActionLinks from "@/Components/ActionLinks";
import ContentContainer from "@/Components/ContentContainer";
import Heading from "@/Components/Heading";
import Label from "@/Components/Label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PageProps, Project, QueryParams, Task } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { LaravelPaginatedResource } from "laravel-resource-pagination-type";
import TaskTable from "../Task/Table";
import { Button } from "@/components/ui/button";

type ShowProps = PageProps & {
  project: Project;
  tasks: LaravelPaginatedResource<Task>;
  queryParams: QueryParams;
  success?: string;
};

export default function Show({ auth, project, tasks, queryParams }: ShowProps) {
  console.log(tasks);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <Heading title={`Project: ${project.name}`} />
          <ActionLinks resource="project" id={project.id} />
        </div>
      }
    >
      <Head title={project.name} />
      <ContentContainer>
        <img
          src={project.image_path}
          alt={project.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <div className="grid grid-cols-2 gap-1">
            <div>
              <Label title="Project ID">{project.id}</Label>
              <Label title="Project Name">{project.name}</Label>
              <Label title="Project Status">
                <span
                  className={cn(
                    "bubble",
                    PROJECT_STATUS_CLASS_MAP[project.status]
                  )}
                >
                  {PROJECT_STATUS_TEXT_MAP[project.status]}
                </span>
              </Label>
              <Label title="Created By">{project.creator.name}</Label>
            </div>
            <div>
              <Label title="Due Date">{project.due_date}</Label>
              <Label title="Created At">{project.created_at}</Label>
              <Label title="Updated By">{project.updater.name}</Label>
            </div>
          </div>
          <Label title="Description">{project.description}</Label>
        </div>
      </ContentContainer>
      <div className="flex justify-between items-center mt-6">
        <Heading title="Tasks" />
        <Link href={route("task.create", { project: project.id })}>
          <Button variant="secondary">Create Task</Button>
        </Link>
      </div>
      <ContentContainer className="mt-4">
        <TaskTable
          {...{ tasks, queryParams }}
          hideName
          refresh={() => router.get(route("project.show", project.id))}
          onDeleteRedirect={route('project.show', project.id)}
        />
      </ContentContainer>
    </AuthenticatedLayout>
  );
}
