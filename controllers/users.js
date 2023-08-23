const { response } = require("express");
const User = require('../models/user');

const getUsers = async (req, resp = response) =>{

    const desde = Number(req.query.desde)||0;

    const users = await User
        .find({_id: {$ne: req.uid}})
        .sort('-online')
        .skip(desde)
        .limit(20);

    resp.json({
        ok: true,
        users,
    });
}

module.exports = {
    getUsers
}