// Description: Constants for the application.
export enum STATUS {
  Pending = "pending",
  InProgress = "in_progress",
  Completed = "completed",
}

export enum PRIORITY {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export const PROJECT_STATUS_TEXT_MAP: Record<STATUS, string> = {
  [STATUS.Pending]: "Pending",
  [STATUS.InProgress]: "In Progress",
  [STATUS.Completed]: "Completed",
} as const;
export const PROJECT_STATUS_CLASS_MAP: Record<STATUS, string> = {
  [STATUS.Pending]: "bg-amber-500",
  [STATUS.InProgress]: "bg-blue-500 ",
  [STATUS.Completed]: "bg-green-500",
} as const;
export const TASK_STATUS_CLASS_MAP: Record<STATUS, string> = {
  [STATUS.Pending]: "bg-amber-500",
  [STATUS.InProgress]: "bg-blue-500",
  [STATUS.Completed]: "bg-green-500",
} as const;
export const TASK_STATUS_TEXT_MAP: Record<STATUS, string> = {
  [STATUS.Pending]: "Pending",
  [STATUS.InProgress]: "In Progress",
  [STATUS.Completed]: "Completed",
} as const;
export const TASK_PRIORITY_CLASS_MAP: Record<PRIORITY, string> = {
  [PRIORITY.Low]: "bg-gray-600",
  [PRIORITY.Medium]: "bg-amber-600",
  [PRIORITY.High]: "bg-red-600",
} as const;
export const TASK_PRIORITY_TEXT_MAP: Record<PRIORITY, string> = {
  [PRIORITY.Low]: "Low",
  [PRIORITY.Medium]: "Medium",
  [PRIORITY.High]: "High",
} as const;

export const USER_COLUMNS = [
  { name: "ID", key: "id", sortable: true },
  { name: "Name", key: "name", sortable: true },
  { name: "Email", key: "email", sortable: true },
  { name: "Created At", key: "created_at", sortable: true },
];

export const PROJECT_COLUMNS = [
  { name: "ID", key: "id", sortable: true },
  { name: "Image", key: "image_path", sortable: false },
  { name: "Name", key: "name", sortable: true },
  { name: "Status", key: "status", sortable: true },
  { name: "Created At", key: "created_at", sortable: true },
  { name: "Due Date", key: "due_date", sortable: true },
  { name: "Created By", key: "creator.name", sortable: false },
];

export const TASK_COLUMNS = [
  { name: "ID", key: "id", sortable: true },
  { name: "Project Name", key: "project.name", sortable: false },
  { name: "Image", key: "image_path", sortable: false },
  { name: "Name", key: "name", sortable: true },
  { name: "Status", key: "status", sortable: true },
  { name: "Priority", key: "priority", sortable: true },
  { name: "Created At", key: "created_at", sortable: true },
  { name: "Due Date", key: "due_date", sortable: true },
  { name: "Created By", key: "creator.name", sortable: false },
];
