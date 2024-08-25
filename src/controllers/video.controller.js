import { Video } from "../models/video.model.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asyncHandler.js";
import { uploadOnCloudinary } from "../utlis/cloudinary.js";

const uploadVideo = asyncHandler(async (req, res) => {
  const { title, descripition } = req.body;

  if (!title || !descripition) {
    throw new ApiError(400, "title or descripition is required");
  }

  const videoLocalPath = req.files?.video[0].path;
  const thumbnailLocalPath = req.files?.thumbnail[0].path;

  if (!videoLocalPath || !thumbnailLocalPath) {
    throw new ApiError(400, " upload video file error");
  }

  const cloudinaryVideo = await uploadOnCloudinary(videoLocalPath);

  console.log(cloudinaryVideo);
  const cloudinarythumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!cloudinaryVideo.url) {
    throw new ApiError(400, "upload video file error");
  }

  const video = await Video.create({
    video: cloudinaryVideo.url,
    title,
    descripition,
    thumbnail: cloudinarythumbnail.url,
    duration: cloudinaryVideo?.duration,
    owner: req.user?._id,
  });

  res
    .status(200)
    .json(new ApiResponse(200, video, "video uploaded successfully"));
});

export { uploadVideo };
