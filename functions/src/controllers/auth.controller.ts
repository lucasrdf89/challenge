import {sign} from "jsonwebtoken";
import User from "../entities/user";
import {firestore, secretJWT} from "../index";

/**
 * Generates a token and refresh token for a user.
 * @param {UserEntity} user - The user entity.
 * @return {Object}
 * An object containing the user's email, token, and refresh token.
 */
const getToken = (user: User): object => {
  return {
    email: user.email,
    token: sign(
      {id: user.id},
      secretJWT,
      {expiresIn: "1h"}
    ),
    refreshToken: sign(
      {id: user.id},
      secretJWT,
      {expiresIn: "1d"}
    ),
  };
};

/**
 * Logs in a user by validating their email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @return {Promise<Object>} A response object containing status, message, and data.
 */
const login = async (email: string) => {
  const snapshot = await firestore.collection("users")
    .where("email", "==", email)
    .get();
  if (snapshot.empty) {
    return {
      status: 404,
      message: "User not found. Please check the email and try again.",
      data: null,
    };
  }
  return {
    status: 200,
    message: "Login successful",
    resp: getToken(snapshot.docs[0].data() as User),
  };
};

/**
 * Registers a new user in the system.
 * @param {UserEntity} data - The user entity containing user details.
 * @return {Promise<Object>} A response object containing status, message, and data.
 */
const register = async (data: User) => {
  const {email} = data;

  const snapshot = await firestore.collection("users")
    .where("email", "==", email)
    .get();
  if (!snapshot.empty) {
    return {
      status: 400,
      message: "User already exists",
    };
  }
  try {
    const newUserRef = firestore.collection("users").doc();
    const newUser: User = {
      ...data,
      id: newUserRef.id,
    };

    await newUserRef.set(newUser);

    return {
      status: 201,
      message: "User created successfully",
      resp: getToken(newUser as User),
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};

export default {
  login,
  register,
};
