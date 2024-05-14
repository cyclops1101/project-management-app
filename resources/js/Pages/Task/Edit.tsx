import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import {
  PRIORITY,
  STATUS,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/lib/constants";
import { PageProps, Task } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

type EditProps = {
  task: Task;
  users: { id: number; name: string }[];
} & PageProps;

export default function Edit({ auth, task, users }: EditProps) {
  const [imagePath, setImagePath] = useState<string | null>(task.image_path);
  const { data, setData, post, errors } = useForm({
    image: null as File | null,
    name: task.name || "",
    status: task.status || "",
    priority: task.priority || "",
    description: task.description || "",
    due_date: task.due_date || "",
    assigned_to: task.assignee || null,
    _method: "PUT",
  });

  console.log(data.assigned_to);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    post(route("task.update", task.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Edit Task: {task.name}
        </h2>
      }
    >
      <Head title="Tasks" />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <form
            onSubmit={onSubmit}
            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
          >
            {imagePath && (
              <img src={imagePath} alt={data.name} className="w-64" />
            )}
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
                onChange={(e) => {
                  setData("name", e.target.value);
                }}
              />

              <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel htmlFor="task_description" value="Task Description" />

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
                onChange={(e) =>
                  setData("priority", e.target.value as PRIORITY)
                }
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
                name="assigned_to"
                id="task_assignee"
                className="mt-1 block w-full"
                value={data.assigned_to ? String(data.assigned_to) : ""}
                onChange={(e) => setData("assigned_to", Number(e.target.value))}
                options={[
                  { label: "Select a assignee", value: "" },
                  ...users.map((user) => ({
                    label: user.name,
                    value: user.id,
                  })),
                ]}
              />

              <InputError message={errors.assigned_to} className="mt-2" />
            </div>
            <div className="mt-4 text-right space-x-2">
              <Link href={route("task.index")}>
                <Button variant="destructive">Cancel</Button>
              </Link>
              <Button type="submit" variant="secondary">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
