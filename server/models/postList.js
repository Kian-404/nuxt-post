const mongoose = require('mongoose');
const Model = mongoose.model;
const postSchema = require('../schemas/postSchema');

const postList = Model('postList', postSchema)

module.exports = postList;