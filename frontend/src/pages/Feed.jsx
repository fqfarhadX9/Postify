import { useEffect, useState } from "react";
import "./feed.css"
import CreatePost from "../components/CreatePost";
import Header from "../components/Header";

const Feed = () => {
  const [posts, setPosts] = useState([]);
   const [commentText, setCommentText] = useState("");
   const [openComments, setOpenComments] = useState(null);

  const token = localStorage.getItem("token");

  const handleLike = async (postId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/post/${postId}/like`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? { ...post, likesCount: data.likesCount }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleComment = async (postId, text) => {
    if (!text) return;

    try {
      const res = await fetch(`http://localhost:5000/api/post/${postId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (data.success) {
        setCommentText("");
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? { 
                 ...post,
                 comments: data.comments,
                 commentsCount: data.commentsCount
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Failed to comment:", error);
    }
  };

  const fetchFeed = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/post/feed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) setPosts(data.posts);
    } catch (error) {
      console.error("Failed to fetch feed:", error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="container">
       <Header />
       <CreatePost />
     {posts.map((post) => (
      <div key={post._id} className="post-card">
        <h4>{post.username}</h4>
        <p>{post.text}</p>
        {post.image && <img src={post.image} alt="post" />}
    
      <div className="post-stats">
        <span>Likes: {post.likesCount}</span>
        <span
          className="comments-count"
          onClick={() =>
            setOpenComments(
              openComments === post._id ? null : post._id
            )
          }
        >
          Comments: {post.commentsCount}
        </span>
      </div>

      <button
        className="like-btn"
        onClick={() => handleLike(post._id)}
      >
        Like
      </button>

      <button 
        className="comment-btn"
         onClick={() => handleComment(post._id, commentText)}
      >
        Comment
      </button>
      <input 
        className="comment-input" 
        placeholder="Write a comment..." 
        value={commentText} 
        onChange={(e) => setCommentText(e.target.value)}
      />

      {openComments === post._id && (
        <div className="comments-section">
          {(post.comments || []).map((comment, index) => (
            <div key={index} className="comment-item">
              <strong>{comment.username}</strong>
              <span> {comment.text}</span>
            </div>
          ))}
        </div>
      )}

  </div>
))}

</div>

  );
};

export default Feed;
