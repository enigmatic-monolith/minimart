import { Response } from "express";
import { supabaseClient } from "../services/supabaseClient";
import { AuthRequest } from "../middleware/authentication";
import { Enums, Tables } from "../database.types";

export type Task = Tables<"tasks">;
export type UserTask = Tables<"user_tasks">;

export const getAllTasks = async (req: AuthRequest, res: Response) => {
  const supabase = supabaseClient(req.accessToken ?? "");

  const { data, error } = await supabase.from("tasks").select(`
            *,
            user_tasks (*)
        `);

  const transformedData = data?.map((task: any) => ({
    ...task,
    pending_count: task.user_tasks ? task.user_tasks.filter((t: UserTask) => t.status === 'pending').length : 0,
  }));

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(transformedData);

  return;
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const supabase = supabaseClient(req.accessToken ?? "");

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  if (!data) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.json(data);
};

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, desc, points }: Task = req.body;
  const supabase = supabaseClient(req.accessToken ?? "");

  const { data, error } = await supabase
    .from("tasks")
    .insert([{ title, desc, points }]);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(201).json(data);
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, desc, points }: Task = req.body;

  const supabase = supabaseClient(req.accessToken ?? "");

  const { data, error } = await supabase
    .from("tasks")
    .update({ title, desc, points })
    .eq("id", id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json(data);
};

export const archiveTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const supabase = supabaseClient(req.accessToken ?? "");

  const { data, error } = await supabase
    .from("tasks")
    .update({ archived_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json(data);
};

export const restoreTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const supabase = supabaseClient(req.accessToken ?? "");

  const { data, error } = await supabase
    .from("tasks")
    .update({ archived_at: null })
    .eq("id", id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json(data);
};

export const updateUserTaskStatus =
  (status: Enums<"task_status">) => async (req: AuthRequest, res: Response) => {
    const { userId, taskId } = req.params;

    const supabase = supabaseClient(req.accessToken ?? "");

    const { data, error } = await supabase
      .from("user_tasks")
      .update({ status: status })
      .eq("user_id", userId)
      .eq("task_id", taskId);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(200).json(data);
  };
