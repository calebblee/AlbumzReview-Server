import { findUserById } from "../users/users-dao.js";
import followsModel from "./follows-model.js";

export const createFollow = async (follow) => {
    const newFollow = await followsModel.create(follow);
    return newFollow;
};

export const findFollowers = async (userId) => {
    const followerIds = await followsModel.find({ following: userId }, 'follower');
    const followers = followerIds.map(follower => findUserById(follower.follower._id));
    const result = await Promise.all(followers);
    return result;
};

export const findFollowing = async (userId) => {
    const followedIds = await followsModel.find({ follower: userId });
    const followed = followedIds.map(follower => findUserById(follower.following._id));
    const result = await Promise.all(followed);
    return result;
};

export const unfollow = async (follow) => {
    const deletedFollow = await followsModel.deleteOne(follow);
    return deletedFollow;
};