import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import TaskDetailsView, { TaskDetailsViewProps } from "./TaskDetailsView";
import TaskDetailsForm, { TaskDetailsFormProps } from "./TaskDetailsForm";
import { Task } from "../../../redux/api/tasksApi";

export type Mode = "create" | "edit" | "view";

export type TaskDetailsModalProps = {
  open: boolean;
  task: Task;
  mode: Mode;
} & Omit<TaskDetailsFormProps, 'setMode'> & Omit<TaskDetailsViewProps, 'setMode'>;

const TaskDetailsModal = ({
  open,
  task,
  mode,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}: TaskDetailsModalProps) => {
  const [currMode, setCurrentMode] = useState(mode);

  useEffect(() => {
    setCurrentMode('view');
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      {currMode === "view" ? (
        <TaskDetailsView task={task} setMode={setCurrentMode} onDelete={onDelete} onClose={onClose}/>
      ) : (
        <TaskDetailsForm
          task={task}
          mode={currMode}
          setMode={setCurrentMode}
          onCreate={onCreate}
          onUpdate={onUpdate}
        />
      )}
    </Dialog>
  );
};

export default TaskDetailsModal;
