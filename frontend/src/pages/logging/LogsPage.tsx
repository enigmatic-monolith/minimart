import { Container, List, ListItem, Card, CardContent, Typography } from '@mui/material';

import { useEffect } from 'react';

type Log = {
  id: number;
  admin: number;
  task: string;
  timestamp: string;
};

function LogsPage() {
  const logs : Log[] = [
    {
      id: 1,
      admin: 1,
      task: "Approve User1's Request",
      timestamp: "12:00"
    },
    {
      id: 2,
      admin: 1,
      task: "Reject User1's Request",
      timestamp: "11:00"
    },
    {
      id: 3,
      admin: 3,
      task: "Add products",
      timestamp: "00:00"
    }
  ]

  useEffect(() => {
    // Fetch logs from backend
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Application Logs
      </Typography>
      <List>
        {logs.map(log => (
            <ListItem key={log.id}>
              <Card variant="outlined" style={{ width: '100%' }}>
                <CardContent>
                <Typography variant="h6" component="div">
                  Admin {log.admin}: {log.task}
                </Typography>
                <Typography color="textSecondary">
                  {log.timestamp}
                </Typography>
                </CardContent>
              </Card>
            </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default LogsPage;