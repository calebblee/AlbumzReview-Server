import usersModel from "./users-model.js";

export const findAllUsers = async () => {
    const users = await usersModel.find();
    return users;
};

export const findUserById = async (id) => {
    const user = await usersModel.findById(id);
    return user;
};

export const findUserByUsername = async (username) => {
    // const user = await usersModel.find({username});
    const user = await usersModel.findOne({ username });
    return user;
};

export const findUserByCredentials = async (username, password) => {
    const user = await usersModel.findOne({ username, password });
    return user;
};

export const findUserByFlags = async () => {
    const user = await usersModel.find({ flags: { $gte: 5 } });
    return user;
};

export const flagUser = async (id, amount) => {
    const status = await usersModel.findOneAndUpdate({ _id: id }, { $inc: { 'flags': amount } });
    return status;
}

export const createUser = async (user) => {
    const newUser = await usersModel.create(user);
    return newUser;
};

export const updateUser = async (id, user) => {
    const status = await usersModel.updateOne({ _id: id }, user);
    return status;
};

export const deleteUser = async (id) => {
    const status = await usersModel.deleteOne({ _id: id });
    return status;
};