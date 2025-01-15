import {
  Badge,
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { Mode } from "./TaskDetailsModal";
import { useCallback } from "react";
import { TaskWithSubmissions, useCreateUserTaskMutation } from "../../../redux/api/tasksApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export type TaskDetailsViewProps = {
  task: TaskWithSubmissions;
  setMode: (mode: Mode) => void;
  onArchive: (id: number) => void;
  onRestore: (id: number) => void;
  onClose: () => void;
  isPending: boolean;
  isApproved: boolean;
  isRejected: boolean;
  refetch: () => void;
};

const TaskDetailsView = ({
  task,
  setMode,
  onArchive,
  onRestore,
  onClose,
  isPending,
  isApproved,
  isRejected,
  refetch
}: TaskDetailsViewProps) => {
  const { user, role } = useSelector((state: RootState) => state.auth);

  const handleArchive = useCallback(() => {
    onArchive(task.id);
  }, [onArchive, onClose, task.id]);

  const handleRestore = useCallback(() => {
    onRestore(task.id);
  }, [onArchive, onClose, task.id]);

  const [createUserTask] = useCreateUserTaskMutation();

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
      {role == "admin" ?
      <DialogActions>
        <Badge
          badgeContent={task.pending_count}
          color="error"
        >
          <Button onClick={() => setMode("submissions")} color="primary" variant="outlined">
            View Submissions
          </Button>
        </Badge>
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
      : 
      <DialogActions>
        {isPending && 
        <Chip label="Pending" color="info" />
        }
        {isApproved && 
        <Chip label="Approved" color="success" />
        }
        {isRejected && 
        <Chip label="Rejected" color="warning" />
        }
        <Button onClick={() => {
          createUserTask({ userId: user?.id as string, taskId: task.id });
          refetch();
          onClose();
        }} 
        color="primary"
        disabled={isPending || isApproved || isRejected}
        >
          Request for points
        </Button>
      </DialogActions>}
    </>
  );
};

export default TaskDetailsView;
