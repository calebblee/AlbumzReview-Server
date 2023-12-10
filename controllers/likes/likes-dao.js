import likesModel from "./likes-model.js";

export const createLike = async (ids) => {
    const newLike = await likesModel.create(ids);
    console.log(newLike);
    return newLike;
};

export const deleteLike = async (ids) => {
    const status = await likesModel.deleteOne(ids);
    return status;
};

export const findAllLikes = async () => {
    const likes = await likesModel.find();
    return likes;
};

export const findLikeByReviewId = async (reviewId) => {
    try {
        const likes = await likesModel.find(reviewId);
        return likes;
    } catch (error) {
        console.log(error);
    }
};

export const findLikesByUsername = async (username) => {
    const likes = await likesModel.find(username);
    return likes;
};