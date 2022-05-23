const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        postIdHackerParentKey:{
            type: DataTypes.INTEGER
        },
        data: {
            type: DataTypes.JSON,
        }


    });
    return Comment;
};