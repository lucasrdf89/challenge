import {Router} from "express";
import validate from "../middlewares/validate";
import Joi from "joi";
import authController from "../controllers/auth.controller";

const router: Router = Router();

/**
 * Route to handle user login.
 * @route POST /login
 * @param {Object} req.body - The request body.
 * @param {string} req.body.email - The user's email.
 * @returns {Object} Response object with status and data.
 */
router.post(
  "/login",
  validate({
    body: Joi.object({
      email: Joi.string().email().required(),
    }),
  }),
  async (req, res) => {
    const {email} = req.body;
    const response = await authController.login(email);
    res.status(response.status).json(response);
  }
);

/**
 * Route to handle user registration.
 * @route POST /register
 * @param {Object} req.body - The request body.
 * @param {string} req.body.email - The user's email.
 * @returns {Object} Response object with status and data.
 */
router.post("/register", validate({
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
}), async (req, res) => {
  const response = await authController.register(req.body);
  res.status(response.status).json(response);
});


export default router;
