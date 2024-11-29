import React from 'react'
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { AiFillPlusCircle } from "react-icons/ai";
import axiosInstance, { getImage } from '../helper/axiosInstance';
import { toast } from 'react-toastify';
export default function FollowCard({user}) {
  const [isHovered, setIsHovered] = useState(false);
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
      toast.success('friend request sent successfully!')
      console.log(result);
    } catch (err) {
      console.log(err);
      toast.error('failed to send friend request')
    }
  };
  return (
    <>
      <div className="follow-div flex justify-between items-center py-3">
        <div className="flex items-center gap-5">
          <div className="avatar ">
            <div className="w-14 h-14 rounded-full">
              <img
                src={getImage(user?.image)}
                alt="img"
              />
            </div>
          </div>
          <div>
            <h2>{ user.username}</h2>
            <p>{user?.bio}</p>
          </div>
        </div>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer"
        >
          {isHovered ? (
            <AiFillPlusCircle className="text-[40px] " onClick={() => addFriend(user._id)} />
          ) : (
            <CiCirclePlus className="text-[40px]" />
          )}
        </div>
      </div>
    </>
  );
}
