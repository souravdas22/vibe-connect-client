import React, { useEffect, useState } from "react";
import axiosInstance, { getImage } from "../../../helper/axiosInstance";
import { SlCalender } from "react-icons/sl";
import { CiMail } from "react-icons/ci";
import PostCard from "../../../components/Card";
import { FaUserCircle } from "react-icons/fa";


export default function Profile() {
  const [user, setUser] = useState();
  console.log(user);
  const id = localStorage.getItem("id");
  useEffect(() => {
    try {
      const userDetails = async () => {
        const user = await axiosInstance.get(`/author/details/${id}`);
        setUser(user.data.data[0]);
      };
      userDetails();
    } catch (err) {
      console.log(err);
    }
  }, [id]);
  return (
    <div className="w-7/12 mx-auto  h-auto">
      <div className="profile-image-div flex justify-center min-h-28 items-center relative shadow-lg mb-12">
        <div className="avatar absolute -bottom-1/4 left-0 right-0 translate-x-96  w-full flex flex-col">
          <div className="ring-primary ring-offset-base-100 w-28 rounded-full ring ring-offset-2">
            <img src={getImage(user?.image)} alt="img" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 gap-4 ">
        <div className="shadow-lg w-4/12 h-48">
          <div className="p-3">
            <h1 className="font-bold">About</h1>
            <p className="capitalize">{user?.bio}</p>
            <ul>
              <li className="flex items-center gap-2 py-2">
                <FaUserCircle />
                <span className="font-light">username: </span>
                <span className="font-bold">{ user?.username}</span>
              </li>
              <li className="flex items-center gap-2 py-2">
                <SlCalender />
                <span className="font-light">Status: </span>
                <span className="font-bold">Single</span>
              </li>
              <li className="flex items-center gap-2 py-2">
                <CiMail />
                <span className="font-light">Email: </span>
                <span className="font-bold">{user?.email}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className=" w-8/12  h-screen  overflow-y-scroll no-scrollbar">
          <h1 className="font-bold px-2 pt-2">Posts</h1>
          {user?.posts?.length > 1 ? (
            <div className="feed-div shadow-xl px-3">
              {user &&
                user.posts.map((post) => (
                  <PostCard
                    key={post.created}
                    user={user}
                    post={post}
                    id={post._id}
                  />
                ))}
            </div>
          ) : (
            <p className="p-3">No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
}
