import mongoose from "mongoose";
const likesSchema = new mongoose.Schema(
    {
        username: String,
        reviewId: String,
        likedAt: { type: Date, default: Date.now },
    },
    { collection: "likes" }
);

likesSchema.index({ username: 1, reviewId: 1 }, { unique: true })

export default likesSchema;