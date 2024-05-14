import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { PROJECT_STATUS_TEXT_MAP, STATUS } from "@/lib/constants";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ auth }: PageProps) {
  const [imagePath, setImagePath] = useState<string | null>(null);
  const { data, setData, post, errors, reset } = useForm({
    image: null as File | null,
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    post(route("project.store"), {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new Project
          </h2>
        </div>
      }
    >
      <Head title="Projects" />

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
                <InputLabel
                  htmlFor="project_image_path"
                  value="Project Image"
                />
                <TextInput
                  id="project_image_path"
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
                <InputLabel htmlFor="project_name" value="Project Name" />

                <TextInput
                  id="project_name"
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
                  htmlFor="project_description"
                  value="Project Description"
                />

                <TextAreaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />

                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_due_date"
                  value="Project Deadline"
                />

                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                />

                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_status" value="Project Status" />

                <SelectInput
                  name="status"
                  id="project_status"
                  className="mt-1 block w-full"
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value as STATUS)}
                  options={[
                    { label: "Select a status", value: "" },
                    ...Object.values(STATUS).map((status) => ({
                      label: PROJECT_STATUS_TEXT_MAP[status],
                      value: status,
                    })),
                  ]}
                />

                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="mt-4 text-right space-x-2">
                <Link href={route("project.index")}>
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
