import { useMemo } from "react";
import { Task } from "./types";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

export const TaskCountReport = ({
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
      const count = tasks.filter((task) => new Date(task.created_at).toDateString() === date.toDateString()).length;
      const label = date.toLocaleDateString('default', {
        day: 'numeric',
        month: 'short',
      });
      return {
        name: label,
        count: count,
      }
    });
  }, [tasks, time]);

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Number of tasks against time</h3>
      <BarChart width={730} height={400} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};
