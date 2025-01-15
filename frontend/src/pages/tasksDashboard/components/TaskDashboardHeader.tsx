import { Add } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import TaskDetailsModal from "./TaskDetailsModal";
import { CreateTaskProps } from "./TaskDetailsForm";

export type TaskDashboardHeaderProps = {
  createTaskProps: Omit<CreateTaskProps, 'onClose'>;
};

export const TaskDashboardHeader = ({
  createTaskProps,
}: TaskDashboardHeaderProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#213555",
          paddingX: 4,
          paddingY: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="white" fontWeight="bold">
            Voucher Tasks
          </Typography>
          <IconButton color="primary" onClick={() => setModalOpen(true)}>
            <Add />
          </IconButton>
        </Box>
      </Box>
      <TaskDetailsModal
        open={modalOpen}
        mode="create"
        onClose={() => setModalOpen(false)}
        createTaskProps={createTaskProps}
      />
    </>
  );
};
