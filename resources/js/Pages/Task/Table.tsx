import {
  STATUS,
  TASK_COLUMNS,
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/lib/constants";
import {
  cn,
  handleOnChange,
  searchFieldChanged,
  sortChanged,
} from "@/lib/utils";
import { QueryParams, Task } from "@/types";
import { Link } from "@inertiajs/react";
import { LaravelPaginatedResource } from "laravel-resource-pagination-type";
import ActionLinks from "../../Components/ActionLinks";
import NoResults from "../../Components/NoResults";
import PaginationControls from "../../Components/PaginationControls";
import SelectInput from "../../Components/SelectInput";
import TableDiv, {
  Table,
  TableBody,
  TableHead,
  TableHeading,
  TableRow,
} from "../../Components/Table";
import TextInput from "../../Components/TextInput";

type TaskTableProps = {
  tasks: LaravelPaginatedResource<Task>;
  queryParams: QueryParams;
  hideName?: boolean;
  refresh: () => void;
  onDeleteRedirect?: string;
};

export default function TaskTable({
  tasks,
  queryParams,
  hideName = false,
  refresh,
  onDeleteRedirect
}: TaskTableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              {TASK_COLUMNS.map((column) =>
                !hideName || column.key !== "project.name" ? (
                  <TableHeading
                    key={column.key}
                    column={column}
                    sortable={column.sortable}
                    onClick={() =>
                      sortChanged(column.key, queryParams, refresh)
                    }
                    sortBy={queryParams?.sortBy}
                    order={queryParams?.order}
                  />
                ) : null
              )}

              <th className="px-3 py-2 text-center">Actions</th>
            </TableRow>
            <tr>
              <td colSpan={hideName ? 2 : 3} />
              <th>
                <TextInput
                  defaultValue={queryParams?.name || ""}
                  placeholder="Search by name"
                  onBlur={(e) =>
                    searchFieldChanged(
                      "name",
                      e.target.value,
                      queryParams,
                      refresh
                    )
                  }
                  onKeyDown={(e) =>
                    handleOnChange("name", e, queryParams, refresh)
                  }
                />
              </th>
              <th>
                <SelectInput
                  defaultValue={queryParams?.status || ""}
                  onChange={(e) =>
                    searchFieldChanged(
                      "status",
                      e.target.value,
                      queryParams,
                      refresh
                    )
                  }
                  options={[
                    { label: "Select a status", value: "" },
                    ...Object.values(STATUS).map((status) => ({
                      label: TASK_STATUS_TEXT_MAP[status],
                      value: status,
                    })),
                  ]}
                />
              </th>
              <td colSpan={5} />
            </tr>
          </TableHead>
          <TableBody>
            {tasks.data.length ? (
              tasks.data.map((task: Task) => (
                <TableRow key={task.id}>
                  <TableDiv>{task.id}</TableDiv>
                  {!hideName && (
                    <TableDiv>
                      <Link href={route("task.show", task.id)}>
                        {task.name}
                      </Link>
                    </TableDiv>
                  )}
                  <TableDiv>
                    <img
                      src={task.image_path}
                      alt={task.name}
                      className="w-10 h-10 rounded-md"
                    />
                  </TableDiv>
                  <TableDiv>{task.name}</TableDiv>
                  <TableDiv>
                    <span
                      className={cn(
                        "bubble",
                        TASK_STATUS_CLASS_MAP[task.status]
                      )}
                    >
                      {TASK_STATUS_TEXT_MAP[task.status]}
                    </span>
                  </TableDiv>
                  <TableDiv>
                    <span
                      className={cn(
                        "bubble",
                        TASK_PRIORITY_CLASS_MAP[task.priority]
                      )}
                    >
                      {TASK_PRIORITY_TEXT_MAP[task.priority]}
                    </span>
                  </TableDiv>
                  <TableDiv>{task.created_at}</TableDiv>
                  <TableDiv>{task.due_date}</TableDiv>
                  <TableDiv>{task.creator.name}</TableDiv>
                  <TableDiv>
                    <ActionLinks resource="task" id={task.id} redirect={onDeleteRedirect} />
                  </TableDiv>
                </TableRow>
              ))
            ) : (
              <NoResults colSpan={TASK_COLUMNS.length + 1} />
            )}
          </TableBody>
        </Table>
      </div>

      {tasks.meta && tasks.meta.links && tasks.meta.links.length > 0 && (
        <PaginationControls links={tasks.meta.links} />
      )}
    </>
  );
}
