import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { Mode } from "./TaskDetailsModal";
import { useCallback } from "react";
import { Task } from "../../../redux/api/tasksApi";

export type TaskDetailsViewProps = {
  task: Task;
  setMode: (mode: Mode) => void;
  onDelete: (id: number) => void;
  onClose: () => void;
};

const TaskDetailsView = ({
  task,
  setMode,
  onDelete,
  onClose,
}: TaskDetailsViewProps) => {
  const handleDelete = useCallback(() => {
    onDelete(task.id);
    onClose();
  }, []);

  return (
    <>
      <DialogContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
          gap={2}
        >
          <Typography variant="h5" fontWeight="bold">
            {task.title}
          </Typography>
          <Typography variant="h6" color="primary" fontWeight="medium">
            +{task.points} pts
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          {task.desc}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setMode("edit")} color="primary">
          Edit
        </Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </>
  );
};

export default TaskDetailsView;
