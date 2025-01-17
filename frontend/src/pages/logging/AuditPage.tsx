import {
  List,
  ListItem,
  Typography,
  Box,
  CircularProgress,
  Divider,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { AuditLog, useGetAllAuditLogsQuery } from "../../redux/api/auditApi";
import {
  AddCircle,
  Archive,
  Cancel,
  CheckCircle,
  Delete,
  Edit,
  Unarchive,
} from "@mui/icons-material";

const tableNameToItemName: { [key: string]: string } = {
  products: "Product",
  user_tasks: "Task Submission",
  tasks: "Task",
  product_requests: "Product Request",
};

const AuditPage = () => {
  const { data: logs = [], isLoading, error } = useGetAllAuditLogsQuery();

  const renderIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case "approved":
        return <CheckCircle color="success" />;
      case "rejected":
        return <Cancel color="error" />;
      case "created":
        return <AddCircle color="primary" />;
      case "updated":
        return <Edit color="warning" />;
      case "deleted":
        return <Delete color="error" />;
      case "archived":
        return <Archive color="secondary" />;
      case "restored":
        return <Unarchive color="warning" />;
      default:
        return <Edit />;
    }
  };

  const formatMessage = (log: AuditLog) => {
    const action = log.action.toLowerCase();
    const user = log.performed_by || "Someone";
    const recordId = log.record_id;
    const table = log.table_name;
    const itemName = tableNameToItemName[table as string];

    return (
      <>
        {`${user} `}
        <Typography component="span" fontWeight="bold">
          {action}
        </Typography>{" "}
        {`${itemName} ${recordId}`}
      </>
    );
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography color="error">Failed to load audit logs.</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Audit Logs
      </Typography>

      <Paper elevation={3} sx={{ maxHeight: "75vh", overflowY: 'auto' }}>
        <List>
          {logs?.length === 0 ? (
            <ListItem>
              <ListItemText primary="No audit logs available." />
            </ListItem>
          ) : (
            logs.map((log) => (
              <>
                <ListItem>
                  <ListItemIcon>{renderIcon(log.action)}</ListItemIcon>
                  <ListItemText
                    primary={formatMessage(log)}
                    secondary={new Date(log.created_at).toLocaleString()}
                  />
                </ListItem>
                <Divider />
              </>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default AuditPage;
