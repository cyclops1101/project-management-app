import ActionLinks from "@/Components/ActionLinks";
import NoResults from "@/Components/NoResults";
import PaginationControls from "@/Components/PaginationControls";
import TableDiv, {
  Table,
  TableBody,
  TableHead,
  TableHeading,
  TableRow,
} from "@/Components/Table";
import TextInput from "@/Components/TextInput";
import { USER_COLUMNS } from "@/lib/constants";
import { handleOnChange, searchFieldChanged, sortChanged } from "@/lib/utils";
import { QueryParams, User } from "@/types";
import { Link } from "@inertiajs/react";
import { LaravelPaginatedResource } from "laravel-resource-pagination-type";

type UserTableProps = {
  users: LaravelPaginatedResource<User>;
  queryParams: QueryParams;
  refresh: () => void;
};

export default function UserTable({
  users,
  queryParams,
  refresh,
}: UserTableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              {USER_COLUMNS.map((column) => (
                <TableHeading
                  key={column.key}
                  column={column}
                  sortable={column.sortable}
                  onClick={() => sortChanged(column.key, queryParams, refresh)}
                  sortBy={queryParams?.sortBy}
                  order={queryParams?.order}
                />
              ))}
              <th className="px-3 py-2 text-center">Actions</th>
            </TableRow>
            <tr>
              <td colSpan={1} />
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
                <TextInput
                  defaultValue={queryParams?.email || ""}
                  placeholder="Search by email"
                  onBlur={(e) =>
                    searchFieldChanged(
                      "email",
                      e.target.value,
                      queryParams,
                      refresh
                    )
                  }
                  onKeyDown={(e) =>
                    handleOnChange("email", e, queryParams, refresh)
                  }
                />
              </th>
              <td colSpan={2} />
            </tr>
          </TableHead>
          <TableBody>
            {users.data.length ? (
              users.data.map((user) => (
                <TableRow key={user.id}>
                  <TableDiv>{user.id}</TableDiv>
                  <TableDiv>
                    <Link
                      className="cursor-pointer"
                      href={route("user.show", user.id)}
                    >
                      {user.name}
                    </Link>
                  </TableDiv>
                  <TableDiv>{user.email}</TableDiv>
                  <TableDiv>{user.created_at}</TableDiv>
                  <TableDiv>
                    <ActionLinks resource="user" id={user.id} />
                  </TableDiv>
                </TableRow>
              ))
            ) : (
              <NoResults colSpan={USER_COLUMNS.length + 1} />
            )}
          </TableBody>
        </Table>
      </div>
      {users.meta && users.meta.links && users.meta.links.length > 0 && (
        <PaginationControls links={users.meta.links} {...{ queryParams }} />
      )}
    </>
  );
}
