import { Grid2 } from '@mui/material';
import { TaskItem, TaskItemProps } from './TaskItem';
import { Task } from '../../../redux/api/tasksApi';

type TaskListProps = Pick<TaskItemProps, 'onDelete' | 'onUpdate' | 'onCreate'> & {
  tasks: Task[];
}

const TaskList = ({ tasks, onUpdate, onDelete, onCreate }: TaskListProps) => {
  return (
    <Grid2 container spacing={2}>
      {tasks.map((task) => (
        <Grid2 key={task.id} size={{ xs: 12, sm: 6, md: 4}}>
          <TaskItem task={task} onUpdate={onUpdate} onDelete={onDelete} onCreate={onCreate}/>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default TaskList;