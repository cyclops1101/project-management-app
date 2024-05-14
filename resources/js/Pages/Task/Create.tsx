import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { TASK_STATUS_TEXT_MAP, STATUS, PRIORITY, TASK_PRIORITY_TEXT_MAP } from "@/lib/constants";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

type CreateProps = PageProps & {
  project: { id: number; name: string };
  users: { id: number; name: string }[];
};

export default function Create({ auth, project, users }: CreateProps) {
  const [imagePath, setImagePath] = useState<string | null>(null);
  const { data, setData, post, errors } = useForm({
    image: null as File | null,
    name: "",
    status: "",
    priority: "",
    description: "",
    due_date: "",
    project_id: project.id,
    assignee: null as string | null,
    redirect: route("project.show", project.id),
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    post(route("task.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new Task for Project: {project.name}
          </h2>
        </div>
      }
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            {imagePath && (
              <img
                src={imagePath}
                alt={data.name}
                className="w-full h-64 object-cover"
              />
            )}
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div>
                <InputLabel htmlFor="task_image_path" value="Task Image" />
                <TextInput
                  id="task_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setData("image", e.target.files[0]);
                      setImagePath(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_name" value="Task Name" />

                <TextInput
                  id="task_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_description"
                  value="Task Description"
                />

                <TextAreaInput
                  id="task_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />

                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_due_date" value="Task Deadline" />

                <TextInput
                  id="task_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                />

                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_status" value="Task Status" />

                <SelectInput
                  name="status"
                  id="task_status"
                  className="mt-1 block w-full"
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value as STATUS)}
                  options={[
                    { label: "Select a status", value: "" },
                    ...Object.values(STATUS).map((status) => ({
                      label: TASK_STATUS_TEXT_MAP[status],
                      value: status,
                    })),
                  ]}
                />

                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_priority" value="Task Priority" />

                <SelectInput
                  name="priority"
                  id="task_priority"
                  className="mt-1 block w-full"
                  value={data.priority}
                  onChange={(e) => setData("priority", e.target.value as PRIORITY)}
                  options={[
                    { label: "Select a priority", value: "" },
                    ...Object.values(PRIORITY).map((priority) => ({
                      label: TASK_PRIORITY_TEXT_MAP[priority],
                      value: priority,
                    })),
                  ]}
                />

                <InputError message={errors.priority} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_assignee" value="Task Assignee" />

                <SelectInput
                  name="assignee"
                  id="task_assignee"
                  className="mt-1 block w-full"
                  value={data.assignee?.toString()}
                  onChange={(e) => setData("assignee", e.target.value)}
                  options={[
                    { label: "Select a assignee", value: "" },
                    ...users.map((user) => ({
                      label: user.name,
                      value: user.id,
                    })),
                  ]}
                />

                <InputError message={errors.assignee} className="mt-2" />
              </div>
              <div className="mt-4 text-right space-x-2">
                <Link href={route("task.index")}>
                  <Button variant="destructive">Cancel</Button>
                </Link>
                <Button variant="secondary">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
