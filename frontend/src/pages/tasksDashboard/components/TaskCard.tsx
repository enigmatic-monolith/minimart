import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import { TaskWithSubmissions } from "../../../redux/api/tasksApi";

export const TaskCard = ({
  task,
  onClick,
}: {
  task: TaskWithSubmissions;
  onClick: () => void;
}) => {
  return (
    <Card sx={{ width: "100%", opacity: task.archived_at ? 0.7 : 1 }}>
      <CardActionArea onClick={onClick}>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", paddingY: 4 }}
        >
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
  );
};
