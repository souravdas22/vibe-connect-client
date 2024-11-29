/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaHome, FaUserFriends } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { IoChatbubblesSharp } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineUpload } from "react-icons/ai";
import PostCard from "../../../components/Card";
import FollowCard from "../../../components/FollowCard";
import StoryCard from "../../../components/StoryCard";
import { FaCamera } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import axios from "axios";
import axiosInstance, { getImage } from "../../../helper/axiosInstance";
import FriendRequestCard from "../../../components/FriendRequestCard";
import PendingFriendRequestCard from "../../../components/PendingRequestCard";
import { FileUploader } from "react-drag-drop-files";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [users, setUsers] = useState([]);
  const [pendingRequest, setPendingRequest] = useState([]);
  const userId = localStorage.getItem("id");

        const id = localStorage.getItem("id");

   const getUsers = async () => {
     try {
       const results = await axios.get("http://localhost:7000/authors");
       const users = results?.data?.data;

       const filteredUsers = users.filter((user) => user._id !== id);

       setUsers(filteredUsers);
     } catch (err) {
       console.log(err);
     }
   };
  useEffect(() => {
    getUsers();
  },[]); // Add `id` as a dependency if it changes over time

  useEffect(() => {
    try {
      const getPendingRequest = async () => {
        const results = await axiosInstance.get(`friends/pending/${userId}`);
        console.log(results?.data?.data);
        setPendingRequest(results?.data?.data);
      };
      getPendingRequest();
    } catch (err) {
      console.log(err);
    }
  }, [userId]);
  useEffect(() => {
    localStorage.getItem("token");
  });
  // console.log(posts)

  const [user, setUser] = useState();
  console.log(user)

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

  // immage upload
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("happy durga puja");
  const [description, setDescription] = useState(
    "had the best durga puja this year"
  );
  const [hashtags, setHashtags] = useState("#trending #puja");
  const fileTypes = ["JPG", "PNG", "GIF"];

  const handleChange = (file) => {
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert hashtags string to array

    // Create form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("hashtags", hashtags); // Store hashtags as JSON string
    if (file) {
      formData.append("image", file);
    }

    try {
      await axiosInstance.post("/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post created successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post");
    }

    document.getElementById("create_post").close();
  };
  return (
    <div className=" h-screen w-11/12 mx-auto flex flex-1 justify-between gap-6 m-7 ">
      <div className="h-screen sticky top-0   w-2/5 rounded-lg left-div px-4  ">
        <div>
          <div className="profile px-4  py-2 mt-3">
            <div className="avatar flex justify-center">
              <div className="w-14 rounded-full">
                <img src={getImage(user?.image)} alt="profile" />
              </div>
            </div>
            <div className="text-center flex flex-col gap-2">
              <h1 className="font-bold font-sans">{user?.username}</h1>
              <p className="text-sm">{user?.bio}</p>
              <p className="text-sm">
                I'd love to change the world, but they won’t give me the source
                code.
              </p>
            </div>
          </div>
          <div className="flex justify-center m-2">
            <div className="flex  flex-col items-center">
              <h1 className="font-bold">{user?.friends.length}</h1>
              <h1 className="font-light text-sm">Friends</h1>
            </div>
            <div className="divider divider-horizontal"></div>

            <div className="flex  flex-col items-center">
              <h1 className="font-bold">{user?.posts.length}</h1>
              <h1 className="font-light text-sm">Photos</h1>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="flex  flex-col items-center">
              <h1 className="font-bold">{user?.posts.length}</h1>
              <h1 className="font-light text-sm">Videos</h1>
            </div>
            <div className="divider"></div>
          </div>
        </div>
        <div className="divider"></div>
        {/* options  */}
        <div className="px-3">
          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-2">
              <FaHome />
              <h1 className="font-bold text-sm">Feed</h1>
            </li>
            <li className="flex items-center gap-2">
              <FaUserFriends />
              <h1 className="font-bold text-sm">
                <button
                  onClick={() =>
                    document.getElementById("friends_modal").showModal()
                  }
                >
                  Friends
                </button>
              </h1>
            </li>
            <li className="flex items-center gap-2">
              <GiWorld />
              <h1 className="font-bold text-sm">Latest News</h1>
            </li>
            <li className="flex items-center gap-2">
              <SlCalender />
              <h1 className="font-bold text-sm">Events</h1>
            </li>
            <li className="flex items-center gap-2">
              <IoChatbubblesSharp />
              <h1 className="font-bold text-sm">Groups</h1>
            </li>
            <li className="flex items-center gap-2">
              <IoMdNotifications />
              <h1 className="font-bold text-sm">Notifications</h1>
            </li>
            <li className="flex items-center gap-2">
              <IoMdSettings />
              <h1 className="font-bold text-sm">Settings</h1>
            </li>
          </ul>
        </div>
        <div className="divider"></div>
        <div className="text-center ">
          <p className="text-blue-800 font-semibold text-sm">
            <Link to="/profile">View Profile</Link>
          </p>
        </div>
      </div>
      <dialog id="friends_modal" className="modal">
        <div className="modal-box max-w-[900px]">
          <form method="dialog">
            {/* Close button */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* Modal content with friend requests */}
          <h3 className="font-bold text-lg mb-4">Friend Requests</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
            {pendingRequest.map((request, index) => (
              <PendingFriendRequestCard key={index} request={request} />
            ))}
          </div>
          <div className="divider"></div>
          <h3 className="font-bold text-lg mb-4">Friend suggestions for you</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {users.map((user, index) => (
              <FriendRequestCard key={index} user={user} />
            ))}
          </div>
        </div>
      </dialog>
      <div className="h-screen w-[65%] overflow-y-scroll no-scrollbar  shadow-md px-5 rounded-md center-div flex flex-col gap-1 overflow-x-hidden">
        {/* story div  */}
        <div>
          <div className="carousel carousel-center max-w-xl rounded-none story-div my-2 ">
            <div className="carousel-item gap-4 flex items-center overflow-x-scroll no-scrollbar  py-2 pr-2">
              <div className="flex flex-col justify-center items-center gap-1 cursor-pointer">
                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`cursor-pointer w-[68px] h-[68px] flex justify-center items-center flex-col border-2 rounded-full transition-all duration-300 ${
                    isHovered ? "bg-gray-400" : "bg-white"
                  }`}
                >
                  <AiOutlineUpload
                    className={`text-[28px]  rounded-full  ${
                      isHovered ? "text-white" : "text-black"
                    }`}
                  />
                </div>
                <p className="text-[10px] font-semibold">Add a story</p>
              </div>

              <StoryCard />
              <StoryCard />
              <StoryCard />
              <StoryCard />
              <StoryCard />
              <StoryCard />
              <StoryCard />
              <StoryCard />
            </div>
          </div>
        </div>
        {/* feed div   */}
        <div className="h-16 flex items-center  my-3 border-2 p-3 rounded-full w-full">
          <div className="flex  w-full">
            <div className="flex items-center me-auto ">
              <div className="avatar">
                <div className="w-9 h-9 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="profile"
                  />
                </div>
              </div>
              <input
                type="text"
                placeholder="Share your thoughts..."
                className="input input-ghost w-full max-w-xs focus:outline-none focus:border-none"
              />
            </div>
            <div className="flex gap-5 items-center pe-3">
              <FaCamera
                className="text-[20px] cursor-pointer"
                onClick={() => window.create_post.showModal()}
              />
              <FaVideo className="text-[20px]" />
            </div>
          </div>

          <dialog id="create_post" className="modal">
            <form
              onSubmit={handleSubmit}
              className="modal-box bg-gray-800 text-white"
            >
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-8 top-5"
                onClick={() => document.getElementById("create_post").close()}
              >
                ✕
              </button>

              <h3 className="font-bold text-lg mb-4 text-center">
                Create Post
              </h3>

              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full mb-4 text-black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full mb-4 text-black h-36"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <input
                type="text"
                placeholder="Hashtags (e.g. #diy #garden)"
                className="input input-bordered w-full mb-4 text-black"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
              />

              <div className="mb-4">
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                />
                {file && (
                  <p className="text-center mt-2">File selected: {file.name}</p>
                )}
              </div>

              <div className="flex justify-end mt-4">
                <button type="submit" className="btn btn-primary">
                  Post
                </button>
              </div>
            </form>
          </dialog>
          {/* <div>
            <p className="text-sm text-slate-500 w-6 h-4">Photo</p>
          </div> */}
        </div>
        {/* <div className="divider"></div> */}
        <div className="feed-div">
          {users &&
            users.map(
              (user) =>
                user.posts.length > 1 &&
                user.posts.map((post) => (
                  <PostCard
                    key={post.created}
                    user={user}
                    post={post}
                    id={post._id}
                  />
                ))
            )}
        </div>
      </div>

      <div className="h-screen w-2/5   rounded-md right-div p-4">
        {/* follow div  */}
        <div>
          <h1 className="text-2xl font-bold pb-2 ">Friend suggestions</h1>
          {users && users.slice(0, 3).map((user) => <FollowCard user={user} />)}
          <div className="flex justify-center rounded-none my-2">
            <button className="bg-slate-200 px-5 py-2 rounded-lg hover:bg-slate-500 font-semibold text-sm hover:text-white transition-all duration-300 btn-block">
              View More
            </button>
          </div>
        </div>
        <div className="divider"></div>
      </div>
    </div>
  );
}
