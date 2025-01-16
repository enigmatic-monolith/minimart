import { useState } from "react";
import { Badge } from "@mui/material";
import TaskDetailsModal, { ViewEditTaskProps } from "./TaskDetailsModal";
import { TaskCard } from "./TaskCard";
import { useSelector } from 'react-redux';
import { RootState } from "../../../redux/store";

export type TaskItemProps = {
  viewEditTaskProps: ViewEditTaskProps;
};

export const TaskItem = ({ viewEditTaskProps }: TaskItemProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { task } = viewEditTaskProps;
  const { role } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Badge
        badgeContent={role == "admin" ? task.pending_count : 0}
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
