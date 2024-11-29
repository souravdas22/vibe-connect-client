import React, { useEffect, useState } from 'react'
import FriendRequestCard from '../../../components/FriendRequestCard'
import axiosInstance from '../../../helper/axiosInstance';

export default function FriendsPage() {
      const [users, setUsers] = useState([]);

      useEffect(() => {
        try {
          const getUsers = async () => {
            const results = await axiosInstance.get("/authors");
            setUsers(results?.data?.data);
          };
          getUsers();
        } catch (err) {
          console.log(err);
        }
      }, []);
  return (
    <div className="carousel carousel-end rounded-box">
          {users && users.map((user) => <FriendRequestCard user={user} />)}
    </div>
  );
}
