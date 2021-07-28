const { Router } = require('express');
const express = require('express');
const BlogsRouter = express.Router();
const UserAuth = require('../UserAuth/UserAuth.js');
const Blog = require('../Database/DatabaseModel/BlogModel.js');
const { isValidObjectId } = require('mongoose');



BlogsRouter.get("/blog/all", async (req, res) => {
    //Get all blogs
    try {
        const dbResponse = await Blog.find();
        if(dbResponse) {
            //data is available
            res.status(200).json(dbResponse);
        }else{
            res.status(400).json("No blogs found.");
        }
    } catch (error) {
        res.status(400).json("No blogs found: "+error.message);
    }
});


BlogsRouter.get("/blog", async (req, res) => {
    //Get indivitual blog by blog id
    try {
        const blogId = req.query.blogId;
        const dbResponse = await Blog.findOne({_id: blogId});
        if(dbResponse){
            res.status(200).json(dbResponse);
        }else{
            // res.status(400).json("Blog not found.");
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Blog not found.");
    }
});

BlogsRouter.get("/blog/myblogs", async (req, res) => {
    try {
        const auther_id = req.query.auther_id;
        const dbResponse = await Blog.find({auther_id});
        res.status(200).json(dbResponse);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

BlogsRouter.get("/blog/custom", async (req, res) => {
    //Get blogs by blog catogery and also set limit
    try {
        const catogery = req.query.catogery;
        const limit =  parseInt(req.query.limit);
        if(limit<0){
            limit = 0;
        }
        if(catogery=="All"){
            //Get blogs of any catogery
            const dbResponse = await Blog.find().limit(limit);
            if(dbResponse){
                res.status(200).json(dbResponse);
            }else{
                throw new Error();
            }
        }else{
            //Get blogs by mention catogery
            const dbResponse = await Blog.find({catogery: catogery.toLowerCase()}).limit(limit);
            if(dbResponse){
                res.status(200).json(dbResponse);
            }else{
                throw new Error();
            }
        }
    } catch (error) {
        res.status(400).json("Blogs not found."+error.message);
    }
});


BlogsRouter.post("/blog", UserAuth, async (req, res) => {
    //To create blog
    const {title, body, catogery, blog_image, auther, auther_id} = req.body;
    if(!title || !body || !catogery || !blog_image || !auther || !auther_id){
        res.status(420).json("Please fill the input fields properly.");
    }else{
        try {
            //save the blog in database
             const blog = new Blog({title: title, body, catogery, blog_image, auther, auther_id});
             await blog.save();
             res.status(200).json("Blog published successfully.");
        } catch (error) {
            // console.log(error.message)
            res.status(400).json("Blog is not published: "+error.message);
        }
    }
});


BlogsRouter.put("/blog", UserAuth, async (req, res) => {
    //Update blog
    const blogId = req.query.blogId;
    const uid = req.query.uid;
    const data = req.body;
    try {
        const dbResponse = await Blog.findOne({_id: blogId, auther_id: uid});
        if(dbResponse){
            //User is a valid user to update this blog
            const response = await Blog.findByIdAndUpdate(blogId, data, {new: true});
            res.status(200).json(response);
        }else{
            //User is not a valid user to update this blog
            res.status(400).json("You are not a unauthorized user to update this blog.");
        }

    } catch (error) {
        res.status(400).json("Blog not update: "+error.message);
    }
});

BlogsRouter.delete("/blog", UserAuth, async (req, res) => {
    //Delete blog
    const blogId = req.query.blogId;
    const uid = req.query.uid;
    try {
        const dbResponse = await Blog.deleteOne({_id: blogId, auther_id: uid});
        if(dbResponse){
            if(dbResponse.deletedCount>0){
                //if blog delete, then 'deletedCount' value will be '1'.
                res.status(200).json("Blog deleted successfully");
            }else{
                res.status(400).json("Blog is not delete.");
            }
           
        }else{
            res.status(400).json("You are not a unauthorized user to delete this blog.");
        }
    } catch (error) {
        res.status(400).json("Blog not delete: "+error.message);
    }
});




module.exports = BlogsRouter;