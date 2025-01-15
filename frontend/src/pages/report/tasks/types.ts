interface UserTask {
  status: "approved" | "rejected" | "pending";
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: number;
  title: string;
  points: number;
  desc: string;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
  user_tasks: UserTask[];
}
