const {DataTypes} = require('sequelize');
const db = require('../db/dbconfig');

const Music = db.define(
    'Music', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        artiste: {
            type: DataTypes.STRING,
        },
        cover: {
             type: DataTypes.STRING,
             allowNull: false,
        },
        sound: {
             type: DataTypes.INTEGER,
             allowNull: false,
        },
        title: {
             type: DataTypes.STRING,
             allowNull: false,
        },
        category: {
             type: DataTypes.STRING,
        },
});

module.exports = Music;