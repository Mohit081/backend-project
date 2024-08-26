import { isValidObjectId } from "mongoose";
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
    videoFile: {
      public_id: cloudinaryVideo?.public_id,
      url: cloudinaryVideo?.url,
    },
    title,
    descripition,
    thumbnail: cloudinarythumbnail.url,
    duration: cloudinaryVideo?.duration,
    owner: req.user?._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, video, "video uploaded successfully"));
});

const getAllVideo = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(400, "videoid is required");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(400, "video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "video found successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "videoid is required");
  }

  const { title, descripition } = req.body;

  if (!title || !descripition) {
    throw new ApiError(400, "title or descripition is  required");
  }

  const thumbnailLocalPath = req.file?.path;

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "thumbnail upload error");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!thumbnail.url) {
    throw new ApiError(400, "thumbnail upload error");
  }

  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        descripition,
        thumbnail: thumbnail.url,
      },
    },
    {
      new: true,
    }
  );

  return res.status(200).json(200, video, "video updated successfully");
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "videoId is required");
  }

  await Video.findByIdAndDelete(videoId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, " video deleted successfully "));
});

const togglePublishStaus = asyncHandler(async(req, res) => {
  const { videoId } = req.params

  if(!isValidObjectId(videoId)){
    throw new ApiError(400 , "videoId is required")
  }

  const video = await Video.findById(videoId)

  if(!video){
    throw new ApiError(400 , "video not found")
  }

  const updateVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        isPublic: !(video?.isPublic)
      }
    },
    {
      new: true
    }
  )

  return res
  .status(200)
  .json(200 , updateVideo , "ispublic updated")

})

export { 
  uploadVideo, 
  getAllVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStaus
 }
