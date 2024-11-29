import React from "react";
import axiosInstance, { getImage } from "../helper/axiosInstance";
import { toast } from "react-toastify";

const FriendRequestCard = ({ user }) => {
  const sendFriendRequest = async (id) => {
    try {
      const data = {
        userId: localStorage.getItem("id"),
        friendId: id,
      };
      const result = await axiosInstance.post("/send-request", data);
      console.log(result?.data?.data);
       toast.success("friend request sent successfully!");
    } catch (err) {
      console.log(err);
        toast.error("failed to send friend request");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <img
        className=" h-48 w-full object-contain rounded-md"
        src={getImage(user.image)}
        alt={`${user.username}'s profile`}
      />
      <div className="mt-2 text-white">
        <h3 className="font-semibold">{user.username}</h3>
      </div>
      <div className="flex mt-4 space-x-2">
        <button
          className="btn btn-outline btn-primary w-full"
          onClick={() => sendFriendRequest(user._id)}
        >
          Add Friend
        </button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
