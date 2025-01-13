import { useState } from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import TaskDetailsModal, { TaskDetailsModalProps, ViewEditTaskProps } from "./TaskDetailsModal";

export type TaskItemProps = {
  viewEditTaskProps: ViewEditTaskProps
};

export const TaskItem = ({
  viewEditTaskProps
}: TaskItemProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { task } = viewEditTaskProps;

  return (
    <>
      <Card sx={{ width: "100%" }}>
        <CardActionArea onClick={() => setModalOpen(true)}>
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
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
        onClose={() => setModalOpen(false)}
        viewEditTaskProps={viewEditTaskProps}
      />
    </>
  );
};
