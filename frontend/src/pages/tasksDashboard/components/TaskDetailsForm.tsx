import { useCallback, useState } from "react";
import {
  TextField,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";
import { Mode } from "./TaskDetailsModal";
import { Task, TaskCreate } from "../../../redux/api/tasksApi";

export type TaskDetailsFormProps = {
  task: Task;
  mode: Mode;
  setMode: (mode: Mode) => void;
  onCreate: (task: TaskCreate) => void;
  onUpdate: (task: Task) => void;
};

const TaskDetailsForm = ({
  task,
  mode,
  setMode,
  onCreate,
  onUpdate,
}: TaskDetailsFormProps) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleUpdate = useCallback(() => {
    onUpdate(editedTask);
    setMode('view');
  }, [editedTask, setMode, onUpdate]);

  const handleCreate = useCallback(() => {
    onCreate(editedTask);
    setMode('view');
  }, [editedTask, setMode, onCreate]);

  const handleCancel = useCallback(() => {
    setMode('view');
  }, [setMode]);

  return (
    <>
      <DialogContent>
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
