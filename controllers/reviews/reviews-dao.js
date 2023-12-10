import { findFollowing } from "../follows/follows-dao.js";
import reviewsModel from "./reviews-model.js";

export const findAllReviews = async () => {
    const reviews = await reviewsModel.find().sort({ 'createdAt': -1 });
    return reviews;
};

export const findReviewByAlbum = async (albumId) => {
    const review = await reviewsModel.find({ albumId });
    return review;
};

export const findReviewIfFlagged = async () => {
    const review = await reviewsModel.find({ flagged: true });
    return review;
};

export const findReviewsByFollowing = async (id) => {
    const following = await findFollowing(id);
    const reviews = await reviewsModel.find({ 'username': { $in: following.map(follow => follow.username) } });
    return reviews;
};

export const findReviewsByUsername = async (username) => {
    // const user = await usersModel.find({username});
    const reviews = await reviewsModel.find({ username });
    return reviews;
};

export const createReview = async (review) => {
    const newReview = await reviewsModel.create(review);
    return newReview;
};

export const updateReview = async (id, review) => {
    const status = await reviewsModel.updateOne({ _id: id }, review);
    return status;
};

export const deleteReview = async (id) => {
    const status = await reviewsModel.deleteOne({ _id: id });
    return status;
};