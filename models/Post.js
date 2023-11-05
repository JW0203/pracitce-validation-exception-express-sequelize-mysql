const sequalize = require('../config/database');
const {DataTypes} = require("sequelize");


const Post = sequalize.define('posts', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        validate:{
            notEmpty: true,
            len: [1, 15]
        }
    },
    content: {
        type : DataTypes.TEXT,
        validate: {
            len:[0, 1000]
        }
    }

},{
    underscored:true
})

module.exports = Post;