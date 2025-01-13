import { useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import TaskDetailsModal, {
  ViewEditTaskProps,
} from "./TaskDetailsModal";

export type TaskItemProps = {
  viewEditTaskProps: ViewEditTaskProps;
};

export const TaskItem = ({ viewEditTaskProps }: TaskItemProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { task } = viewEditTaskProps;

  return (
    <>
      <Card sx={{ width: "100%", opacity: task.archived_at ? 0.7 : 1 }}>
        <CardActionArea onClick={() => setModalOpen(true)}>
          <CardContent sx={{ display: "flex", flexDirection: "column", paddingY: 4 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
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
              <Typography
                variant="subtitle1"
                color="primary"
                fontWeight="medium"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                +{task.points} pts
              </Typography>
            </Box>
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
