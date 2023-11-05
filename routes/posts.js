const Post = require('../models/Post');
const sequelize = require("../config/database");
const express = require('express');
const app = express();
const router = express.Router();
const {Op} = require('sequelize');
app.use(express.json());

router.post("/", async (req, res)=>{
    const {title, content} = req.body;

    try{
        const newPost = await sequelize.transaction(async ()=>{
            const post = await Post.create({
                title,
                content
            });
            return post;
        })
        res.status(200).send(newPost);

    }catch (err){
        console.error("Error while create a post");
        res.status(500).send(err);
    }
})

// 게시글 검색
router.get("/", async (req, res) =>{
    const {query} = req.query;
    const queryLengthCheck = query.trim();
    if (queryLengthCheck.length === 0){
        res.status(400).send(`Search keywords must be at 
        least 1 character excluding spaces.`)
    }

    try {
        const searchedPosts = await Post.findAll({
            where:{
                content: {[Op.like] : `%${query}%`}
            }
        })
        if(searchedPosts.length === 0){
            res.status(404).send(`There are no contents containing word, "${query}".`)
        }else{
            res.status(200).send(searchedPosts)
        }
    } catch (err){
        console.log("ERROR while search posts")
        res.status(500).send(err)
    }
})

router.get('/', async (req, res) =>{
    try{
        const allFoundPosts = await Post.findAll();
        res.status(200).send(allFoundPosts)
    } catch (err){
        console.error("Error while find all posts")
        res.status(500).send(err)
    }
})


router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    try{
        const foundPost = await Post.findByPk(id)
        if(!foundPost){
            res.status(404).send(`There is no posts with id ${id}`)
        }else{
            res.status(200).send(foundPost)
        }
    } catch (err){
        console.error(`Error while find post ${id}`)
        res.status(500).send(err)
    }
})

// 게시글 수정
router.patch('/:id', async (req, res) =>{
    const id= req.params.id;
    const {title, content} = req.body;

    const foundPost = await Post.findByPk(id)

    if (!foundPost){
        return res.status(404).send(`Post id ${id} is not exist`)
    }
    try{
        const revisedPost = await sequelize.transaction(async ()=>{
            await Post.update({
                title: title,
                content: content
            },
            {
                where:{id:id}
            })

            return await Post.findByPk(id)
        })
        res.status(200).send(revisedPost)
    }catch (err){
        console.log("Error while revising a post")
        res.status(500).send(err);
    }
})

router.delete("/:id", async (req, res) =>{
    const id = req.params.id;
    const validPostId = Post.findByPk(id)

    if(!validPostId){
        res.status(404).send(`The post id ${id} is not exist`)
    }

    await Post.destroy({
        where:{id:id}
    })
    res.status(204).send();
})



module.exports = router;

