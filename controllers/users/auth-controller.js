import * as usersDao from "./users-dao.js";
import dotenv from 'dotenv'
import axios from "axios";
dotenv.config()

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET


const AuthController = (app) => {
    const findAllUsers = async (req, res) => {
        const users = await usersDao.findAllUsers();
        res.json(users);
    };

    const findUserByUsername = async (req, res) => {
        // const user = users.find((user) => user.username === req.params.username);
        const user = await usersDao.findUserByUsername(req.params.username);
        res.json(user);
    };

    const findUsersByFlags = async (req, res) => {
        const users = await usersDao.findUserByFlags();
        res.json(users);
    };

    const register = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = await usersDao
            .findUserByUsername(username);
        if (user) {
            res.sendStatus(409);
            return;
        }
        const newUser = await usersDao
            .createUser(req.body);
        req.session["currentUser"] = newUser;
        res.json(newUser);
    };

    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = await usersDao
            .findUserByCredentials(username, password);
        if (user) {
            req.session["currentUser"] = user;
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    };

    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        res.json(currentUser);
    };

    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = async (req, res) => {
        const user = req.body;
        const status = await usersDao.updateUser(req.params.id, user);
        req.session["currentUser"] = user;
        res.send(status);
    };

    const flag = async (req, res) => {
        const amount = req.body;
        const status = await usersDao.flagUser(req.params.id, amount.amount);
        res.send(status);
    };

    const getToken = async (req, res) => {
        axios({
            url: 'https://accounts.spotify.com/api/token',
            method: 'post',
            params: {
                grant_type: 'client_credentials'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            if (response.status === 200) {
                var gen_token = response.data.access_token;
                res.json({ gen_token: gen_token })
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    };

    const deleteUser = async (req, res) => {
        // const index = users.findIndex((user) => user.id === req.params.id);
        // users.splice(index, 1);
        const status = await usersDao.deleteUser(req.params.id);
        res.send(status);
      };


    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.get("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    app.put("/api/users/:id", update);
    app.put("/api/users/:id/flag", flag);
    app.get("/api/users/token", getToken);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/flagged", findUsersByFlags);
    app.get("/api/users/username/:username", findUserByUsername);
    app.delete("/api/users/:id", deleteUser);
};
export default AuthController;

