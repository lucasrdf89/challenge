import {firestore} from "../index";
import Task from "../entities/task";

/**
 * Retrieves a task by ID.
 * @param {string} id - The ID of the task to retrieve.
 * @returns {Promise<{status: number, data?: Task, message?: string}>} The response object with status and task data or error message.
 */
const getTask = async (id: string) => {
  const taskDoc = await firestore.collection("tasks").doc(id).get();
  if (taskDoc.exists) {
    return {status: 200, resp: {id: taskDoc.id, ...taskDoc.data()} as Task};
  } else {
    return {status: 404, message: "Task not found"};
  }
};

/**
 * Updates a task by ID.
 * @param {Task} data - The task data to update.
 * @param {string} id - The ID of the task to update.
 * @returns {Promise<{status: number, message?: string}>} The response object with status and optional error message.
 */
const updateTask = async (data: Task, id: string, userId: string) => {
  const taskRef = firestore.collection("tasks").doc(id);
  const taskDoc = await taskRef.get();
  if (!taskDoc.exists) {
    return {status: 404, message: "Task not found"};
  }
  if (taskDoc.data()?.userId !== userId) {
    return {status: 403, message: "You are not authorized to delete this task"};
  }
  await taskRef.update({...data});
  return {status: 200, message: "Task updated successfully"};
};

/**
 * Creates a new task.
 * @param {Task} data - The task data to create.
 * @returns {Promise<{status: number, data?: Task, message?: string}>} The response object with status and optional error message.
 */
const createTask = async (data: Task, userId: string) => {
  const taskRef = firestore.collection("tasks").doc();
  const newTask: Task = {...data, userId};

  await taskRef.set(newTask);

  return {status: 201, resp: newTask};
};

/**
 * Deletes a task by ID.
 * @param {string} id - The ID of the task to delete.
 * @returns {Promise<{status: number, message?: string}>} The response object with status and optional error message.
 */
const deleteTask = async (id: string, userId: string) => {
  const taskRef = firestore.collection("tasks").doc(id);
  const taskDoc = await taskRef.get();

  if (!taskDoc.exists) {
    return {status: 404, message: "Task not found"};
  }

  if (taskDoc.data()?.userId !== userId) {
    return {status: 403, message: "You are not authorized to delete this task"};
  }

  await taskRef.delete();
  return {status: 200, message: "Task deleted successfully"};
};

/**
 * Retrieves all Tasks.
 * @return {Promise<{status: number, data: Task[]}>} The response object with status and list of Tasks.
 */
const getAllTasks = async (userId: string) => {
  const tasksSnapshot = await firestore.collection("tasks").where("userId", "==", userId).get();
  const tasks: Task[] = tasksSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()} as Task));

  return {status: 200, resp: tasks};
};

export default {
  getTask,
  updateTask,
  createTask,
  deleteTask,
  getAllTasks,
};
