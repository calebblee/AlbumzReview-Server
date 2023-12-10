import mongoose from "mongoose";
const reviewsSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        albumId: { type: String },
        albumReview: { type: String },
        albumRating: { type: Number, default: 0 },
        flagged: { type: Boolean, default: false },
    },
    { collection: "reviews" }
);
export default reviewsSchema;