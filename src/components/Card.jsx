import React, { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineSend,
} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import axiosInstance, { getImage } from "../helper/axiosInstance";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const PostCard = ({ user, post }) => {
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(user.likes > 1);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [comments, setComments] = useState(post.comments);
  const [modalKey, setModalKey] = useState(0);

  const likePost = async (id) => {
    try {
      const action = liked ? "dislike" : "like";
      await axiosInstance.post(`/posts/${id}/${action}`);
      setLiked(!liked);
      setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.log("Error liking/disliking post:", err);
    }
  };
  const addFriend = async (id) => {
    try {
      console.log(id, "friendId");
      console.log(localStorage.getItem("id"), "userId");
      const userId = localStorage.getItem("id");
      const data = {
        userId: userId,
        friendId: id,
      };
      const result = await axiosInstance.post(`/send-request`, data);
      if (data) {
        toast.success("friend request sent successfully!");
      }
      console.log(result);
    } catch (err) {
      console.log(err);
      toast.error("failed to sent request");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment) return;

    const commentData = {
      postId: post._id,
      authorId: user._id,
      content: comment,
    };

    try {
      const response = await fetch("http://localhost:7000/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments((prev) => [...prev, newComment]);
        setComment("");
        setModalKey((prevKey) => prevKey + 1);
        toast.success("comment posted successfully!");
      } else {
        toast.error("Failed to submit comment");
      }
    } catch (error) {
      toast.error("Error submitting comment:", error);
    }
  };

  return (
    <>
      <div className="w-full bg-base-100 py-2 my-2">
        <div className="flex items-center p-4">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full">
              <img src={getImage(user?.image)} alt="profile avatar" />
            </div>
          </div>
          <div className="ml-4">
            <p className="font-semibold text-base">{user?.username}</p>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleTimeString()}
              <span role="img" aria-label="location">
                📍
              </span>
              Venice, CA
            </p>
          </div>
          <div className="ml-auto cursor-pointer dropdown dropdown-end dropdown-hover">
            <BsThreeDots
              className="text-gray-600 text-xl"
              tabIndex={0}
              role="button"
            />
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow-lg border"
            >
              <li>
                <button onClick={() => addFriend(user._id)}>Add friend</button>
              </li>
              <li>
                <Link>See profile</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Post Image */}
        <div className="h-[550px] overflow-hidden">
          <img
            src={getImage(post?.image)}
            alt="Post content"
            className="w-full object-contain h-full"
          />
        </div>

        {/* Post Actions */}
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {liked ? (
                <FaHeart
                  className="text-2xl cursor-pointer text-red-600"
                  onClick={() => likePost(post._id)}
                />
              ) : (
                <AiOutlineHeart
                  className="text-2xl cursor-pointer text-red-600"
                  onClick={() => likePost(post._id)}
                />
              )}
              <AiOutlineComment
                className="text-2xl cursor-pointer"
                onClick={() =>
                  document.getElementById(`modal-${post._id}`).showModal()
                }
              />
              <AiOutlineSend className="text-2xl cursor-pointer" />
            </div>
          </div>

          {/* Post Likes */}
          <p className="text-sm font-semibold mt-2">{likesCount} likes</p>

          {/* Post Caption */}
          <p className="text-sm">
            <span className="font-semibold">{user.username} </span>
            {post.description}
          </p>
          <p className="text-sm">
            {post?.hashtags &&
              post.hashtags.length > 0 &&
              post.hashtags.map((tag, index) => (
                <span key={index} className="mr-2 text-blue-500">
                  {tag}
                </span>
              ))}
          </p>

          {/* View Comments */}
          <p
            className="text-sm text-gray-500 mt-2 cursor-pointer"
            onClick={() =>
              document.getElementById(`modal-${post._id}`).showModal()
            }
          >
            View all {comments.length} comments
          </p>

          {/* Add Comment */}
          <form className="mt-3 relative" onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="input input-ghost w-full text-sm border border-gray-300 focus:outline-none focus:border-blue-500 rounded-full pl-10 pr-10"
            />
            <button type="submit">
              <IoMdSend className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer" />
            </button>
          </form>
        </div>
      </div>

      {/* Modal with the entire post content */}
      <dialog id={`modal-${post?._id}`} className="modal" key={modalKey}>
        <div className="modal-box no-scrollbar w-11/12 max-w-screen-lg ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost outline-none absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="flex h-[600px]">
            {/* Post Image on the Left */}
            <div className="w-1/2">
              <img
                src={getImage(post?.image)}
                alt="Post content"
                className="w-full object-contain object-center h-full"
              />
            </div>

            {/* Content Section on the Right */}
            <div className="w-1/2 flex flex-col p-4">
              {/* Profile Info in Modal */}
              <div className="flex items-center mb-4">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full">
                    <img src={getImage(user?.image)} alt="profile avatar" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-base">{user?.username}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleTimeString()}
                    <span role="img" aria-label="location">
                      📍
                    </span>
                    Venice, CA
                  </p>
                </div>
                <div className="ml-auto cursor-pointer">
                  <BsThreeDots className="text-gray-600 text-xl" />
                </div>
              </div>

              <div className="flex flex-col justify-between h-full">
                {/* Comments Section */}
                <div className="mt-4">
                  {comments.length < 1 ? (
                    <p>No comments yet</p>
                  ) : (
                    comments.map((comment) => (
                      <div
                        className="flex items-center py-3 justify-between"
                        key={comment._id}
                      >
                        <div className="flex items-center gap-1">
                          <div className="avatar">
                            <div className="w-8 h-8 rounded-full">
                              <img
                                src={getImage(user?.image)}
                                alt="profile avatar"
                              />
                            </div>
                          </div>
                          <p className="text-sm">
                            <span className="font-semibold pe-3">
                              {user?.username}
                            </span>
                            <span className="text-sm">{comment.content}</span>
                          </p>
                        </div>
                        <p>
                          <AiOutlineHeart />
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div>
                  {/* Post Actions in Modal */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-4">
                      {liked ? (
                        <FaHeart
                          className="text-2xl cursor-pointer text-red-600"
                          onClick={() => likePost(post._id)}
                        />
                      ) : (
                        <AiOutlineHeart
                          className="text-2xl cursor-pointer text-red-600"
                          onClick={() => likePost(post._id)}
                        />
                      )}
                      <AiOutlineComment className="text-2xl cursor-pointer" />
                      <AiOutlineSend className="text-2xl cursor-pointer" />
                    </div>
                  </div>

                  {/* Post Likes, Caption, Hashtags */}
                  <div>
                    <p className="text-sm font-semibold">{likesCount} likes</p>
                    <p className="text-sm">
                      <span className="font-semibold">{user.username} </span>
                      {post.description}
                    </p>
                  </div>

                  {/* Add Comment */}
                  <form
                    className="mt-3 relative"
                    onSubmit={handleCommentSubmit}
                  >
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="input input-ghost w-full text-sm border border-gray-300 focus:outline-none focus:border-blue-500 rounded-full pl-10 pr-10"
                    />
                    <button type="submit">
                      <IoMdSend className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PostCard;
