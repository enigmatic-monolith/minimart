import { Check, Close } from "@mui/icons-material";
import { Paper, Grid2, Typography, Chip, IconButton } from "@mui/material";
import { UserTask } from "../../../redux/api/tasksApi";

export type SubmissionCardProps = {
  userTask: UserTask;
  onApprove: ({ userId, taskId }: { userId: string; taskId: number }) => void;
  onReject: ({ userId, taskId }: { userId: string; taskId: number }) => void;
};

export const SubmissionCard = ({ userTask, onApprove, onReject }: SubmissionCardProps) => {
  return (
    <Paper
      key={`${userTask.user_id}_${userTask.task_id}`}
      elevation={2}
      sx={{
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Grid2 container gap={2}>
        <Grid2 display="flex" alignItems="center" gap={1}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {userTask.user_id}
          </Typography>
          <Chip
            label={userTask.status}
            color={
              userTask.status === "pending"
                ? "warning"
                : userTask.status === "approved"
                ? "success"
                : "error"
            }
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
        </Grid2>
        {userTask.status === "pending" && (
          <Grid2
            display="flex"
            sx={{
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <IconButton
              color="success"
              size="small"
              onClick={() =>
                onApprove({
                  userId: userTask.user_id,
                  taskId: userTask.task_id,
                })
              }
            >
              <Check />
            </IconButton>
            <IconButton
              color="error"
              size="small"
              onClick={() =>
                onReject({
                  userId: userTask.user_id,
                  taskId: userTask.task_id,
                })
              }
            >
              <Close />
            </IconButton>
          </Grid2>
        )}
      </Grid2>
    </Paper>
  );
};
