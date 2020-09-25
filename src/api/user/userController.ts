import * as _ from "lodash";
import { Request, Response, NextFunction } from "express";

import { User, IUserModel } from "./userModel";

export interface NewRequest extends Request {
   user: IUserModel;
}

/**
 * PARAM /:username
 * A middleware that find a user by username and attach it to the request.
 */
export let usernameParam = async (request: NewRequest, response: Response, next: NextFunction, username: string) => {
  const user = await User.findOne({ username });
  if (!user) {
    return response.status(404).json({
      _message: `No user with the given username: ${username}`,
      user: user,
    });
  }

  request.user = user;
  next();
};

/**
 * GET /user/:username
 * Get a user general information.
 */
export let getUserInfo = async (request: NewRequest, response: Response) => {
  return response.json(request.user);
};

/**
 * GET /user/feed
 * Get the own user tweets feed.
 */
export let getOwnFeed = async (request: NewRequest, response: Response) => {
};

/**
 * POST /user/reset-password
 * Send a reset password email request to reset own password.
 */
export let resetOwnPassword = async (request: NewRequest, response: Response) => {
};

/**
 * PUT /user/change-password
 * Change user own password.
 */
export let changeOwnPassword = async (request: NewRequest, response: Response) => {
  const user =  await User.findById(request.user._id).select("+password");

  // Check that the password and confirmPassword are match.
  if (request.body.password !== request.body.confirmPassword) {
    return response.status(400).json({
      _message: "Cannot update password. Passwords are not matched.",
      user: {},
    });
  }

  // Check that they are in the right length.
  if (request.body.password.length < 8 || request.body.password.length > 30) {
    return response.status(400).json({
      _message: "Password should be more then 8 characters and less the 30.",
      user: {},
    });
  }

  // Update and save the new password.
  user.password = request.body.password;
  const savedCustomer = await user.save();

  return response.json({
    _message: "User password successfully updated!",
    user: savedCustomer,
  });
};

/**
 * GET /user/settings
 * Get user own settings.
 */
export let getOwnSettings = async (request: NewRequest, response: Response) => {
};

/**
 * PUT /user/change-settings
 * Change user own settings.
 */
export let changeOwnSettings = async (request: NewRequest, response: Response) => {
};

/**
 * POST /user
 * Create a new user.
 */
export let createUser = async (request: Request, response: Response) => {
  const newUser = new User(request.body);

  try {
    const savedUser = await newUser.save();
    return response.json({
      _message: "User successfully created!",
      user: savedUser,
    });
  } catch (error) {
    return response.status(400).json({
      _message: error.message,
      user: {},
    });
  }
};

/**
 * PUT /user
 * Edit user own general info.
 */
export let editMyInfo = async (request: NewRequest, response: Response) => {
  const user = request.user;
  const update = request.body;

  if (request.body._id && request.body._id != request.user._id) {
    return response.status(400).json({
      _message: "User can not updated! id is not matched.",
      user: {},
    });
  }

  _.merge(user, update);

  const savedCustomer = await user.save();
  response.json({
    _message: "User successfully updated!",
    user: savedCustomer,
  });
};

/**
 * DELETE /user
 * Delete user own account.
 */
export let deleteMe = async (request: NewRequest, response: Response) => {
  const deleteUser = await request.user.remove();
  return response.json({
    _message: "User successfully deleted!",
    user: deleteUser,
  });
};
