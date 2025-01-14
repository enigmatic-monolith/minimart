import { useState } from "react";
import {
  Badge,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import TaskDetailsModal, { ViewEditTaskProps } from "./TaskDetailsModal";
import { TaskCard } from "./TaskCard";

export type TaskItemProps = {
  viewEditTaskProps: ViewEditTaskProps;
};

export const TaskItem = ({ viewEditTaskProps }: TaskItemProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { task } = viewEditTaskProps;

  return (
    <>
      <Badge
        badgeContent={task.pending_count}
        color="error"
        sx={{ width: "100%"}}
      >
        <TaskCard task={task} onClick={() => setModalOpen(true)} />
      </Badge>
      <TaskDetailsModal
        open={modalOpen}
        mode="view"
        onClose={() => setModalOpen(false)}
        viewEditTaskProps={viewEditTaskProps}
      />
    </>
  );
};
