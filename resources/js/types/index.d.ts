import { PRIORITY, STATUS } from "@/lib/constants";
import { Config } from "ziggy-js";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
};

export type QueryParams = {
  [key: string]: string | undefined;
};

export interface Project {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: STATUS;
  image_path: string;
  creator: User;
  updater: User;
  created_at: string;
  tasks?: Task[];
}

export interface Task {
  id: number;
  image_path: string;
  name: string;
  description: string;
  due_date: string;
  priority: PRIORITY;
  status: STATUS;
  project: Project;
  creator: User;
  updater: User;
  created_at: string;
  assignee?: User | null | number;
}
