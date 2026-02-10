const Post = require("../models/post.model.js");
const User = require("../models/user.model.js");

const createPost = async (req, res) => {
  try {
    const text = req.body.text;
    const image = req.file;

    if (!text && !image) {
      return res.status(400).json({
        message: "Post must have text or image",
      });
    }

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const post = await Post.create({
      text,
      image: image ? `/uploads/${image.filename}` : null,
      user: req.user,
      username: user.username, 
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

    const formattedPosts = posts.map(post => ({
      _id: post._id,
      username: post.username,
      text: post.text,
      image: post.image,
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
      comments: post.comments || [],
      createdAt: post.createdAt,
    }));

    res.status(200).json({
      success: true,
      posts: formattedPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
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

const commentPost = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user;
    const postId = req.params.postId;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const user = await User.findById(userId);

    post.comments.push({
      user: userId,
      username: user.username,
      text,
    });

    await post.save();

    res.status(200).json({
      success: true,
      commentsCount: post.comments.length,
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


module.exports = { 
    createPost,
    getFeed,
    likePost,
    commentPost
};
