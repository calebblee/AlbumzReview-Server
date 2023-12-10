import mongoose from "mongoose";
const followsSchema = new mongoose.Schema(
    {
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        following: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    },
    { collection: "follows" }
);

followsSchema.index({ follower: 1, following: 1 }, { unique: true })

export default followsSchema;