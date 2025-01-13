import {
  Box,
  Button,
  Chip,
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
  onArchive: (id: number) => void;
  onRestore: (id: number) => void;
  onClose: () => void;
};

const TaskDetailsView = ({
  task,
  setMode,
  onArchive,
  onRestore,
  onClose,
}: TaskDetailsViewProps) => {
  const handleArchive = useCallback(() => {
    onArchive(task.id);
  }, [onArchive, onClose, task.id]);

  const handleRestore = useCallback(() => {
    onRestore(task.id);
  }, [onArchive, onClose, task.id]);

  return (
    <>
      <DialogContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
          gap={4}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h5" fontWeight="bold">
              {task.title}
            </Typography>
            {task.archived_at ? (
              <Chip
                label="Archived"
                color="warning"
                size="small"
                sx={{ fontWeight: "bold" }}
              />
            ) : (
              <Chip
                label="Active"
                color="success"
                size="small"
                sx={{ fontWeight: "bold" }}
              />
            )}
          </Box>
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
        {task.archived_at ? (
          <Button onClick={handleRestore} color="error">
            Restore
          </Button>
        ) : (
          <Button onClick={handleArchive} color="error">
            Archive
          </Button>
        )}
      </DialogActions>
    </>
  );
};

export default TaskDetailsView;
