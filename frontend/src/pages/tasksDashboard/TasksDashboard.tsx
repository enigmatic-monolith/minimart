import { CircularProgress, Container } from "@mui/material";
import TaskList from "./components/TaskList";
import {
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../redux/api/tasksApi";
import { useMemo } from "react";

export const TasksDashboard = () => {
  const { data: tasks = [], isLoading } = useGetTasksQuery();

  const sortedTasks = useMemo(() => {
    return tasks.slice().sort((a, b) => b.id - a.id);
  }, [tasks]);

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  return (
    <Container>
      {isLoading ? (
        <CircularProgress size="4rem" />
      ) : (
        <TaskList
          tasks={sortedTasks}
          onDelete={() => ""}
          onUpdate={updateTask}
          onCreate={createTask}
        />
      )}
    </Container>
  );
};
