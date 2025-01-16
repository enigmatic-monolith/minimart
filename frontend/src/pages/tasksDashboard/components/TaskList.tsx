import { Grid2 } from '@mui/material';
import { TaskItem } from './TaskItem';
import { TaskWithSubmissions, useGetUserTasksByUserIdQuery } from '../../../redux/api/tasksApi';
import { ViewEditTaskProps } from './TaskDetailsModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

type TaskListProps = {
  tasks: TaskWithSubmissions[];
  viewEditTaskProps: Omit<ViewEditTaskProps, 'task' | "isPending" | 'isApproved' | 'isRejected'
  | 'refetch'>;
}

type HashMap = {
  [key: string]: string;
}

const TaskList = ({ tasks, viewEditTaskProps }: TaskListProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { data: userTasks, refetch } = useGetUserTasksByUserIdQuery(user?.id as string);

  const hashMap = (userTasks ?? []).reduce((map, item) => {
    map[item.task_id] = item.status;
    return map;
  }, {} as HashMap);

  return (
    <Grid2 container spacing={2}>
      {tasks.map((task) => {
        const isPending = hashMap.hasOwnProperty(task.id.toString()) && hashMap[task.id.toString()] == 'pending';
        const isApproved = hashMap.hasOwnProperty(task.id.toString()) && hashMap[task.id.toString()] == 'approved';
        const isRejected = hashMap.hasOwnProperty(task.id.toString()) && hashMap[task.id.toString()] == 'rejected';

        return (<Grid2 key={task.id} size={{ xs: 12, sm: 6, md: 4}}>
          <TaskItem viewEditTaskProps={{ task, ...viewEditTaskProps, isPending, isApproved, isRejected, refetch}}/>
        </Grid2>
      )})}
    </Grid2>
  );
};

export default TaskList;