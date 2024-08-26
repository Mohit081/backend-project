import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import { deleteVideo, getAllVideo, getVideoById, togglePublishStaus, updateVideo, uploadVideo } from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()

router.route("/").post(verifyJwt,
    upload.fields([
    {
      name: "video",
      maxCount: 1
    },
    {
      name: "thumbnail",
      maxCount: 1
    }
  ])
   , uploadVideo)

router.route("/").get(getAllVideo)
router.route("/getvideo").get(getVideoById)
router.route("/update").post(verifyJwt,upload.single("thumbnail"),updateVideo)
router.route("/delete").delete(verifyJwt,deleteVideo)
router.route("/isPublic").patch(verifyJwt,togglePublishStaus)

export default router;     