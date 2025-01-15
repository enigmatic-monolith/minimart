import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Task } from "./types";
import { TaskCountReport } from "./TaskCountReport";
import { UserTaskReport } from "./UserTaskReport";

export const TaskReport = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const currentTime = useMemo(() => new Date(), []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/task/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data: Task[]) => {
        setTasks(data);
      });
  }, []);

  return (
    <div>
      <h2>Task Report</h2>
      <TaskCountReport tasks={tasks} time={currentTime} />
      <UserTaskReport tasks={tasks} time={currentTime} />
    </div>
  );
};
