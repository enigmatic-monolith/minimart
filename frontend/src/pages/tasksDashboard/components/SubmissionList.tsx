import {
  DialogContent,
  Typography,
  Button,
  Stack,
  DialogActions,
} from "@mui/material";
import { TaskWithSubmissions } from "../../../redux/api/tasksApi";
import { Mode } from "./TaskDetailsModal";
import { SubmissionCard } from "./SubmissionCard";

export type SubmissionListProps = {
  task: TaskWithSubmissions;
  onApprove: ({ userId, taskId }: { userId: string; taskId: number }) => void;
  onReject: ({ userId, taskId }: { userId: string; taskId: number }) => void;
  setMode: (mode: Mode) => void;
};

export const SubmissionList = ({
  task: taskWithSubmissions,
  onApprove,
  onReject,
  setMode,
}: SubmissionListProps) => {
  return (
    <>
      <DialogContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {taskWithSubmissions.title}
        </Typography>
        <Stack spacing={1} maxHeight="40vh">
          {taskWithSubmissions.user_tasks.map((userTask) => (
            <SubmissionCard userTask={userTask} onApprove={onApprove} onReject={onReject}/>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setMode("view")} color="primary">
          Back
        </Button>
      </DialogActions>
    </>
  );
};
