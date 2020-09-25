import { Router } from "express";
import {
  usernameParam, getUserInfo, getOwnFeed, resetOwnPassword, changeOwnPassword, getOwnSettings,
  changeOwnSettings, createUser, editMyInfo, deleteMe,
} from "./userController";

const router: Router = Router();

router.param("username", usernameParam);

router.route("/:username")
  .get(getUserInfo);

router.route("/feed")
  .get(getOwnFeed);

router.route("/reset-password")
  .post(resetOwnPassword);

router.route("/change-password")
  .put(changeOwnPassword);

router.route("/settings")
  .get(getOwnSettings);

router.route("/change-settings")
  .put(changeOwnSettings);

router.route("/")
  .post(createUser)
  .put(editMyInfo)
  .delete(deleteMe);

export default router;
