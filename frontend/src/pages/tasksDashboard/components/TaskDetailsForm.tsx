import { useCallback, useState } from "react";
import {
  TextField,
  DialogContent,
  Button,
  DialogActions,
  Typography,
} from "@mui/material";
import { Mode } from "./TaskDetailsModal";
import { Task, TaskCreate, TaskUpdate } from "../../../redux/api/tasksApi";

export type CreateTaskProps = {
  onCreate: (task: TaskCreate) => void;
  onClose: () => void;
}

export type EditTaskProps = {
  task: Task,
  onUpdate: ({id, task} : { id: number, task: TaskUpdate}) => void;
  setMode: (mode: Mode) => void;
}

export type TaskDetailsFormProps = {
  mode: Mode;
  createTaskProps?: CreateTaskProps;
  editTaskProps?: EditTaskProps;  
};

const TaskDetailsForm = ({
  mode,
  createTaskProps,
  editTaskProps,
}: TaskDetailsFormProps) => {
  const [editedTask, setEditedTask] = useState<TaskCreate>(editTaskProps ? editTaskProps.task : { title: '', points: 0});

  const handleUpdate = useCallback(() => {
    if (!editTaskProps || !editedTask.id) return;
    const { id, ...other } = editedTask;
    editTaskProps.onUpdate({id, task: other});
    editTaskProps.setMode('view');
  }, [editedTask, editTaskProps]);

  const handleCancel = useCallback(() => {
    if (!editTaskProps) return;
    editTaskProps.setMode('view');
  }, [editTaskProps]);

  const handleCreate = useCallback(() => {
    if (!createTaskProps) return;
    createTaskProps.onCreate(editedTask);
    createTaskProps.onClose();
  }, [editedTask, createTaskProps]);


  return (
    <>
      <DialogContent>
        <Typography variant="h6">
          {mode === 'create' ? "Create New Task" : "Edit Task"}
        </Typography>
        <TextField
          fullWidth
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask({ ...editedTask, title: e.target.value })
          }
          label="Title"
          margin="normal"
        />
        <TextField
          fullWidth
          type="number"
          value={editedTask.points}
          onChange={(e) =>
            setEditedTask({ ...editedTask, points: Number(e.target.value) })
          }
          label="Points"
          margin="normal"
        />
        <TextField
          fullWidth
          multiline
          value={editedTask.desc}
          onChange={(e) =>
            setEditedTask({ ...editedTask, desc: e.target.value })
          }
          label="Description"
          margin="normal"
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        {mode === "create" ? (
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        ) : (
          <>
            <Button onClick={handleCancel} color="error">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Save
            </Button>
          </>
        )}
      </DialogActions>
    </>
  );
};

export default TaskDetailsForm;
