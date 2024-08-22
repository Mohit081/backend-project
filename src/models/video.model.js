import mongoos, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    // videoFile
    video: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desricption: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      required: true,
    },
    // isPublished
    isPublic: {
      type: Boolean,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoos.model("Video", videoSchema);
