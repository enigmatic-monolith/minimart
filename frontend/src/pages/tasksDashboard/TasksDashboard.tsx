import {
  Box,
  CircularProgress,
} from "@mui/material";
import TaskList from "./components/TaskList";
import {
  useApproveUserTaskMutation,
  useArchiveTaskMutation,
  useCreateTaskMutation,
  useGetTasksQuery,
  useRejectUserTaskMutation,
  useRestoreTaskMutation,
  useUpdateTaskMutation,
} from "../../redux/api/tasksApi";
import { useMemo } from "react";
import { TaskDashboardHeader } from "./components/TaskDashboardHeader";

export const TasksDashboard = () => {
  const { data: tasks = [], isLoading } = useGetTasksQuery();

  const sortedTasks = useMemo(() => {
    return tasks.slice().sort((a, b) => {
      if (!a.archived_at === !b.archived_at) {
        return b.id - a.id;
      }
      return a.archived_at ? 1 : -1;
    });
  }, [tasks]);

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [archiveTask] = useArchiveTaskMutation();
  const [restoreTask] = useRestoreTaskMutation();
  const [rejectUserTask] = useRejectUserTaskMutation();
  const [approveUserTask] = useApproveUserTaskMutation();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#3E5879",
          borderRadius: 2,
          boxShadow: 3,
          height: "80vh",
          overflowY: "auto",
        }}
      >
        <TaskDashboardHeader createTaskProps={{onCreate: createTask}}/>
        <Box sx={{ padding: 4 }}>
          {isLoading ? (
            <CircularProgress size="4rem" />
          ) : (
            <TaskList
              tasks={sortedTasks}
              viewEditTaskProps={{
                onUpdate: updateTask,
                onArchive: archiveTask,
                onRestore: restoreTask,
                onApprove: approveUserTask,
                onReject: rejectUserTask,
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
