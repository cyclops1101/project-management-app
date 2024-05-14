import { QueryParams } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const searchFieldChanged = (
  name: string,
  value: string,
  queryParams: QueryParams,
  fn: () => void
) => {
  if (value) {
    queryParams[name] = value;
  } else {
    delete queryParams[name];
  }
  fn();
};

export const handleOnChange = (
  name: string,
  e: React.KeyboardEvent<HTMLInputElement>,
  queryParams: QueryParams,
  fn: () => void
) => {
  if (e.key === "Enter") {
    searchFieldChanged(
      name,
      (e.target as HTMLInputElement).value,
      queryParams,
      fn
    );
  }
};

export const sortChanged = (
  key: string,
  queryParams: QueryParams,
  fn: () => void
) => {
  if (queryParams?.sortBy === key) {
    queryParams.order = queryParams.order === "asc" ? "desc" : "asc";
  } else {
    queryParams.sortBy = key;
    queryParams.order = "asc";
  }

  fn();
};
