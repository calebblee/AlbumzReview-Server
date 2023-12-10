import * as followsDao from "./follows-dao.js";

function FollowsController(app) {
    const createFollow = async (req, res) => {
        const follow = req.body;
        const newFollow = await followsDao.createFollow(follow);
        console.log(newFollow);
        res.json(newFollow);
    };
    const findFollowers = async (req, res) => {
        const userId = req.params.userId;
        const followers = await followsDao.findFollowers(userId);
        res.json(followers);
    };
    const findFollowing = async (req, res) => {
        const userId = req.params.userId;
        const followed = await followsDao.findFollowing(userId);
        res.json(followed);
    };
    const unfollow = async (req, res) => {
        const follow = req.body;
        const status = await followsDao.unfollow(follow);
        res.json(status);
    };

    app.post("/api/follows", createFollow);
    app.get("/api/follows/followers/:userId", findFollowers);
    app.get("/api/follows/followed/:userId", findFollowing);
    app.delete("/api/follows", unfollow);
}

export default FollowsController;