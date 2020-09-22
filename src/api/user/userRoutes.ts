import { Router } from "express";
import {
  usernameParam, getOwnFeed, getUserInfo, getFollowersList, getFollowingList, followUser, unfollowUser, resetOwnPassword,
  changeOwnPassword, changeOwnSettings, createUser, editMyInfo, deleteMe,
} from "./userController";

const router: Router = Router();

router.param("username", usernameParam);

router.route("/followers/:username")
  .get(getFollowersList);

router.route("/following/:username")
  .get(getFollowingList);

router.route("/follow/:username")
  .post(followUser);

router.route("/unfollow/:username")
  .post(unfollowUser);

router.route("/:username")
  .get(getUserInfo);

router.route("/feed")
  .get(getOwnFeed);

router.route("/reset-password")
  .post(resetOwnPassword);

router.route("/password")
  .put(changeOwnPassword);

router.route("/settings")
  .put(changeOwnSettings);

router.route("/")
  .post(createUser)
  .put(editMyInfo)
  .delete(deleteMe);

export default router;
