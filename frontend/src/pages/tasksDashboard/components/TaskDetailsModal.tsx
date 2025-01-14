import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import TaskDetailsView, { TaskDetailsViewProps } from "./TaskDetailsView";
import TaskDetailsForm, {
  CreateTaskProps,
  EditTaskProps,
} from "./TaskDetailsForm";
import { SubmissionList, SubmissionListProps } from "./SubmissionList";

export type Mode = "create" | "edit" | "view" | "submissions";

export type ViewEditTaskProps = Omit<
  EditTaskProps & TaskDetailsViewProps & SubmissionListProps,
  "setMode" | "onClose"
>;

export type TaskDetailsModalProps = {
  open: boolean;
  mode: Mode;
  onClose: () => void;
  createTaskProps?: Omit<CreateTaskProps, "onClose">;
  viewEditTaskProps?: ViewEditTaskProps;
};

const TaskDetailsModal = ({
  open,
  mode,
  onClose,
  createTaskProps,
  viewEditTaskProps,
}: TaskDetailsModalProps) => {
  const [currMode, setMode] = useState(mode);

  useEffect(() => {
    setMode(mode);
  }, [open, mode]);

  return (
    <Dialog open={open} onClose={onClose}>
      {currMode === "view" && viewEditTaskProps && (
        <TaskDetailsView
          onClose={onClose}
          setMode={setMode}
          {...viewEditTaskProps}
        />
      )}
      {currMode === "edit" && viewEditTaskProps && (
        <TaskDetailsForm
          mode={currMode}
          editTaskProps={{ ...viewEditTaskProps, setMode }}
        />
      )}
      {currMode === "submissions" && viewEditTaskProps && (
        <SubmissionList setMode={setMode} {...viewEditTaskProps} />
      )}
      {currMode === "create" && createTaskProps && (
        <TaskDetailsForm mode={currMode} createTaskProps={{ ...createTaskProps, onClose}} />
      )}
    </Dialog>
  );
};

export default TaskDetailsModal;
