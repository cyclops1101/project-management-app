import { QueryParams } from '@/types';
import { router } from '@inertiajs/react';
import React from 'react'

type SearchRowProps = {
  queryParams: QueryParams;
  children: React.ReactNode;
};

export default function SearchRow({queryParams, children}: SearchRowProps) {
  const searchFieldChanged = (name: string, value: string) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
  };

  const handleOnChange = (
    name: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      searchFieldChanged(name, (e.target as HTMLInputElement).value);
    }
  };
  return (
    <tr>{children}</tr>
  )
}
