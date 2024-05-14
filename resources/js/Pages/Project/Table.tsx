import {
  PROJECT_COLUMNS,
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
  STATUS,
} from "@/lib/constants";
import {
  cn,
  handleOnChange,
  searchFieldChanged,
  sortChanged,
} from "@/lib/utils";
import { Project, QueryParams } from "@/types";
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

type ProjectTableProps = {
  projects: LaravelPaginatedResource<Project>;
  queryParams: QueryParams;
  refresh: () => void;
};

export default function ProjectTable({
  projects,
  queryParams,
  refresh,
}: ProjectTableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              {PROJECT_COLUMNS.map((column) => (
                <TableHeading
                  column={column}
                  key={column.key}
                  sortable={column.sortable}
                  onClick={() => sortChanged(column.key, queryParams, refresh)}
                  sortBy={queryParams?.sortBy}
                  order={queryParams?.order}
                />
              ))}
              <th className="px-3 py-2 text-center">Actions</th>
            </TableRow>
            <tr>
              <td colSpan={2} />
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
                      label: PROJECT_STATUS_TEXT_MAP[status],
                      value: status,
                    })),
                  ]}
                />
              </th>
              <td colSpan={4} />
            </tr>
          </TableHead>
          <TableBody>
            {projects.data.length ? (
              projects.data.map((project) => (
                <TableRow key={project.id}>
                  <TableDiv>{project.id}</TableDiv>
                  <TableDiv>
                    <Link
                      className="cursor-pointer"
                      href={route("project.show", project.id)}
                    >
                      <img
                        className="rounded-md max-w-20"
                        src={project.image_path}
                        alt=""
                      />
                    </Link>
                  </TableDiv>
                  <TableDiv>
                    <Link
                      className="cursor-pointer"
                      href={route("project.show", project.id)}
                    >
                      {project.name}
                    </Link>
                  </TableDiv>
                  <TableDiv className="p-0">
                    <span
                      className={cn(
                        "bubble",
                        PROJECT_STATUS_CLASS_MAP[project.status]
                      )}
                    >
                      {PROJECT_STATUS_TEXT_MAP[project.status]}
                    </span>
                  </TableDiv>
                  <TableDiv>{project.created_at}</TableDiv>
                  <TableDiv>{project.due_date}</TableDiv>
                  <TableDiv>{project.creator.name}</TableDiv>
                  <TableDiv>
                    <ActionLinks resource="project" id={project.id} />
                  </TableDiv>
                </TableRow>
              ))
            ) : (
              <NoResults colSpan={PROJECT_COLUMNS.length + 1} />
            )}
          </TableBody>
        </Table>
      </div>
      {projects.meta &&
        projects.meta.links &&
        projects.meta.links.length > 0 && (
          <PaginationControls
            links={projects.meta.links}
            {...{ queryParams }}
          />
        )}
    </>
  );
}
