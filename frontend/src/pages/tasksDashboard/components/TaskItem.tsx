import { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import TaskDetailsModal, { TaskDetailsModalProps } from "./TaskDetailsModal";
import { Task } from "../../../redux/api/tasksApi";

export type TaskItemProps = Pick<
  TaskDetailsModalProps,
  "onCreate" | "onDelete" | "onUpdate"
> & {
  task: Task;
};

export const TaskItem = ({
  task,
  onCreate,
  onUpdate,
  onDelete,
}: TaskItemProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card sx={{ width: "100%" }}>
        <CardActionArea onClick={() => setModalOpen(true)}>
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" fontWeight="bold">
              {task.title}
            </Typography>
            <Typography variant="subtitle2" color="primary" fontWeight="medium">
              +{task.points} pts
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <TaskDetailsModal
        open={modalOpen}
        mode="view"
        task={task}
        onCreate={onCreate}
        onClose={() => setModalOpen(false)}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </>
  );
};
