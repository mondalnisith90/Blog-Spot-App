const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Blog title is required"],
        minlength: [3, "Blog title is very short, Write more."],
        trim: true
    },
    body: {
        type: String,
        required: [true, "Blog body is required"],
        trim: true
    },
    catogery: {
        type: String,
        required: [true, "Blog catogery is required"],
        lowercase: true,
        trim: true
    },
    blog_image: {
        type: String,
        required: [true, "Blog image is required"],
        trim: true
    },
    auther: {
        type: String,
        required: [true, "Auther name is required"],
        trim: true
    },
    auther_id: {
        type: String,
        required: [true, "Auther id is required"],
        trim: true
    },
    views: {
        type: Number,
        default: 0

    },
    likes: {
        type: Array,
        default: []
    },
    dislikes: {
        type: Array,
        default: []
    },
    publish_date: {
        type: Date,
        default: new Date(Date.now())
    }
});


const Blog = mongoose.model("Blog", blogSchema);


module.exports = Blog;