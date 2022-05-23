const { Sequelize, DataTypes } = require('sequelize');
const comment = require("./comment");

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        postIdHacker:{
            type: DataTypes.INTEGER
        },
        data: {
            type: DataTypes.JSON,
        }


    });
    return Post;
};