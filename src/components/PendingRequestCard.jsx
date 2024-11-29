import React from "react";
import axiosInstance, { getImage } from "../helper/axiosInstance";
import { toast } from "react-toastify";

const PendingFriendRequestCard = ({ request }) => {
  console.log(request);
  const acceptFriendRequest = async (id) => {
    try {
      const data = {
        userId: localStorage.getItem("id"),
        friendId: id,
      };
      const result = await axiosInstance.post("/accept-request", data);
      console.log(result?.data?.data);
      toast.success("added friend successfully!");
    } catch (err) {
      console.log(err);
      toast.error("failed to add ");
    }
  };
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <img
        className=" h-48 w-full object-contain rounded-md"
        src={getImage(request.image)}
        alt={`${request.username}'s profile`}
      />
      <div className="mt-2 text-white">
        <h3 className="font-semibold">{request.username}</h3>
      </div>
      <div className="flex mt-4 space-x-2">
        <button
          className="btn btn-info btn-outline w-full"
          onClick={() => acceptFriendRequest(request.requesterId)}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PendingFriendRequestCard;
