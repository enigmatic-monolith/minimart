import { Grid2 } from '@mui/material';
import { TaskItem } from './TaskItem';
import { TaskWithSubmissions } from '../../../redux/api/tasksApi';
import { ViewEditTaskProps } from './TaskDetailsModal';

type TaskListProps = {
  tasks: TaskWithSubmissions[];
  viewEditTaskProps: Omit<ViewEditTaskProps, 'task'>;
}

const TaskList = ({ tasks, viewEditTaskProps }: TaskListProps) => {
  return (
    <Grid2 container spacing={2}>
      {tasks.map((task) => (
        <Grid2 key={task.id} size={{ xs: 12, sm: 6, md: 4}}>
          <TaskItem viewEditTaskProps={{ task, ...viewEditTaskProps}}/>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default TaskList;