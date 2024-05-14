import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps, QueryParams, Task } from "@/types";
import Heading from "@/Components/Heading";
import ContentContainer from "@/Components/ContentContainer";
import TaskTable from "./Task/Table";
import { LaravelPaginatedResource } from "laravel-resource-pagination-type";

type DashboardProps = {
  auth: PageProps["auth"];
  totalPendingTasks: number;
  myPendingTasks: number;
  totalProgressTasks: number;
  myProgressTasks: number;
  totalCompletedTasks: number;
  myCompletedTasks: number;
  activeTasks: LaravelPaginatedResource<Task>;
  queryParams: QueryParams;
};

export default function Dashboard({
  auth,
  totalPendingTasks,
  myPendingTasks,
  totalProgressTasks,
  myProgressTasks,
  totalCompletedTasks,
  myCompletedTasks,
  activeTasks,
  queryParams,
}: DashboardProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <h3 className="text-amber-500 text-2xl font-semibold">
              Pending Tasks
            </h3>
            <p className="text-xl mt-4">
              <span className="mr-2">{myPendingTasks}</span>/
              <span className="ml-2">{totalPendingTasks}</span>
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <h3 className="text-blue-500 text-2xl font-semibold">
              In Progress Tasks
            </h3>
            <p className="text-xl mt-4">
              <span className="mr-2">{myProgressTasks}</span>/
              <span className="ml-2">{totalProgressTasks}</span>
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <h3 className="text-green-500 text-2xl font-semibold">
              Completed Tasks
            </h3>
            <p className="text-xl mt-4">
              <span className="mr-2">{myCompletedTasks}</span>/
              <span className="ml-2">{totalCompletedTasks}</span>
            </p>
          </div>
        </div>
      </div>
      <Heading title="My Active Tasks" className="my-6"/>
      <ContentContainer>
        <TaskTable tasks={activeTasks} {...{queryParams}} refresh={()=>router.get(route('dashboard'))}/>
      </ContentContainer>
    </AuthenticatedLayout>
  );
}
