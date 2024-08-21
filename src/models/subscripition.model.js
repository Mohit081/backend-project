import mongoose,{Schema} from "mongoose";

const subscripitionSChema = new Schema({
   subscriber: {
    type:Schema.Types.ObjectId,
    ref:User
   },
   channel: {
     type:Schema.Types.ObjectId,
     ref:User
   }

},{timestamps:true})

export const Subscripition = mongoose.model("Subscripition",subscripitionSChema)