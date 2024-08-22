import { Router } from "express";
import { 
  changePassword, 
  getUserChannelprofile, 
  getUserWatchHistory, 
  refreshAccessToken,
  updateAccountDetails, 
  updateAvatar, 
  updateCoverImage, 
  userLogin, 
  userLogout, 
  userRegister 
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1
    },
    {
      name: "coverImage",
      maxCount: 1
    }
  ]),
  userRegister
);
router.route("/login").post(userLogin);
router.route("/logout").post( verifyJwt , userLogout)
router.route("/refresh-token").post(verifyJwt , refreshAccessToken)
router.route("/change-password").post(verifyJwt , changePassword)
router.route("/update-account").patch(verifyJwt , updateAccountDetails)
router.route("/avatar").patch(verifyJwt , upload.single("avatar") , updateAvatar)
router.route("/cover-image").patch(verifyJwt , upload.single("coverImage"), updateCoverImage)
router.route("/c/:userName").get(verifyJwt , getUserChannelprofile)
router.route("/history").get(verifyJwt , getUserWatchHistory)


export default router;
