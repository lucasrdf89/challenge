import {Router} from "express";
import type {Request, Response} from "express";
import validate from "../middlewares/validate";
import Joi from "joi";
import authorize from "../middlewares/authorization";
import taskController from "../controllers/task.controller";

const router: Router = Router();

/**
 * Get all Tasks.
 * @route GET /
 */
router.get("", authorize(), async (req: Request, res: Response): Promise<void> => {
  const userId = req.auth.id;
  const response = await taskController.getAllTasks(userId);
  res.status(response.status).json(response);
});

/**
 * Update a Task by ID.
 *
 * @route PUT /:id
 * @param {number} id - Task ID
 * @param {object} body - Task data
 *
 */
router.put(
  "/:id",
  validate({
    body: Joi.object({
      id: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      created: Joi.string().required(),
      userId: Joi.string().required(),
      checked: Joi.boolean().required(),
    }),
    params: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  authorize(),
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.auth.id;
    const response = await taskController.updateTask(req.body, req.params.id, userId);
    res.status(response.status).json(response);
  }
);

/**
 * Create a new Task.
 *
 * @route POST /
 * @param {object} body - Task data
 *
 */
router.post(
  "",
  validate({
    body: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      created: Joi.string().required(),
      checked: Joi.boolean().required(),
    }),
  }),
  authorize(),
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.auth.id;
    const response = await taskController.createTask(req.body, userId);
    res.status(response.status).json(response);
  }
);

/**
 * Delete a task by ID.
 *
 * @route DELETE /:id
 * @param {number} id - Task ID
 *
 */
router.delete(
  "/:id",
  authorize(),
  validate({
    params: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.auth.id;
    const response = await taskController.deleteTask(req.params.id, userId);
    res.status(response.status).json(response);
  }
);

export default router;
