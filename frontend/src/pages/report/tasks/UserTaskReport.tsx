import { useMemo } from "react";
import { Task } from "./types";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

export const UserTaskReport = ({
  tasks,
  time,
}: {
  tasks: Task[],
  time: Date,
}) => {
  const data = useMemo(() => {
    // array of last 7 days from `time`
    const last7Days = Array.from({ length: 7 }, (_, i) => new Date(time.getTime() + i * 24 * 3600 * 1000));
    return last7Days.map((date) => {
      const createCount = tasks.map(
        (task) => task.user_tasks
          .filter((user_task) => new Date(user_task.created_at).toDateString() === date.toDateString()).length)
        .reduce((acc, val) => acc + val, 0);
      const processedCount = tasks.map(
        (task) => task.user_tasks
          .filter((user_task) => new Date(user_task.updated_at).toDateString() === date.toDateString() && user_task.status !== 'pending').length)
        .reduce((acc, val) => acc + val, 0);
      const label = date.toLocaleDateString('default', {
        day: 'numeric',
        month: 'short',
      });
      return {
        name: label,
        "Number of tasks created": createCount,
        "Number of tasks processed": processedCount,
      }
    });
  }, [tasks, time])

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Number of user tasks against time</h3>
      <BarChart width={730} height={400} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Number of tasks created" fill="#8884d8" />
        <Bar dataKey="Number of tasks processed" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};
