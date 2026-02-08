const Post = require("../models/post.model.js");
const User = require("../models/user.model.js");

const createPost = async (req, res) => {
  try {
    const { text, image } = req.body;

    if (!text && !image) {
      return res
        .status(400)
        .json({ message: "Post must contain text or image" });
    }

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = await Post.create({
      text,
      image,
      user: req.user,
      username: user.username
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user;

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (uid) => uid.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      liked: !alreadyLiked,
      likesCount: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { 
    createPost,
    getFeed,
    likePost,
};
