import * as reviewsDao from './reviews-dao.js';
import * as likesDao from '../likes/likes-dao.js';

const ReviewController = (app) => {

    const likeReview = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        console.log({
            username: currentUser.username,
            reviewId: req.params.reviewId,
        })
        const like = await likesDao.createLike({
            username: currentUser.username,
            reviewId: req.params.reviewId,
        });
        res.json(like);
    };

    const deleteLike = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }

        const status = await likesDao.deleteLike({
            username: currentUser.username,
            reviewId: req.params.reviewId,
        });
        res.send(status);
    };

    const findLikesByReview = async (req, res) => {
        const likes = await likesDao.findLikeByReviewId({
            reviewId: req.params.reviewId,
        });
        res.json(likes);
    };

    const findLikesByUsername = async (req, res) => {
        const likes = await likesDao.findLikesByUsername({
            userId: req.params.username,
        });
        res.json(likes);
    };

    const findAllLikes = async (req, res) => {
        const likes = await likesDao.findAllLikes();
        res.json(likes);
    };

    const findAllReviews = async (req, res) => {
        const reviews = await reviewsDao.findAllReviews();
        res.json(reviews);
    };

    const findReviewByAlbum = async (req, res) => {
        const reviews = await reviewsDao.findReviewByAlbum(req.params.albumId);
        res.json(reviews);
    };

    const findReviewsByFollowing = async (req, res) => {
        const reviews = await reviewsDao.findReviewsByFollowing(req.params.id);
        res.json(reviews);
    };

    const findReviewByUser = async (req, res) => {
        const reviews = await reviewsDao.findReviewsByUsername(req.params.username);
        res.json(reviews);
    };

    const findReviewIfFlagged = async (req, res) => {
        const reviews = await reviewsDao.findReviewIfFlagged();
        res.json(reviews);
    };

    const createReview = async (req, res) => {
        const review = req.body;
        const status = await reviewsDao.createReview(review);
        res.send(status);
    };

    const updateReview = async (req, res) => {
        const review = req.body;
        const status = await reviewsDao.updateReview(req.params.id, review);
        res.send(status);
    };

    const deleteReview = async (req, res) => {
        const status = await reviewsDao.deleteReview(req.params.id);
        res.send(status);
    };


    app.get("/api/reviews", findAllReviews);
    app.get("/api/reviews/flagged", findReviewIfFlagged);
    app.get("/api/reviews/album/:albumId", findReviewByAlbum);
    app.get("/api/reviews/username/:username", findReviewByUser);
    app.get("/api/reviews/user/:id", findReviewsByFollowing);
    app.post("/api/reviews", createReview);
    app.put("/api/reviews/:id", updateReview);
    app.delete("/api/reviews/:id", deleteReview);
    app.get("/api/reviews/likes", findAllLikes);
    app.post("/api/reviews/likes/:reviewId/", likeReview);
    app.delete("/api/reviews/likes/:reviewId/", deleteLike);
    app.get("/api/reviews/likes/:reviewId", findLikesByReview);
    app.get("/api/reviews/likes/user/:username", findLikesByUsername);
};
export default ReviewController;

