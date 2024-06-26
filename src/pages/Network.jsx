import { useContext, useEffect, useState } from "react";
import { fetchAllUsers } from "../services";
import { AuthContext, AuthDispatchContext } from '../store';
import { FriendsDispatchContext, FriendsContext } from "../store";

import { baseURL } from "../env";

//layout
import Layout from "../layout/Layout.jsx";

const Network = () => {
  const [users, setUsers] = useState([]);
  const [isUsersloading, setUsersLoading] = useState(true);
  const [isFriendsLoading, setFriendsLoading] = useState(true);
  const [error, setError] = useState('');
  const authState = useContext(AuthContext);
  const authDispatch = useContext(AuthDispatchContext);
  const friendsData = useContext(FriendsContext);
  const { friendsList, loading, dataLoaded} = friendsData;
  const friendsDispatch = useContext(FriendsDispatchContext);
  const userId = authState.user._id;
  const hasFriends = authState.user.hasFriends;

  useEffect(() => {
    setFriendsLoading(false);
  }, [friendsData]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const getUsersData = async () => {
      try {
        const result = await fetchAllUsers(token);
        setUsers(result);
        setUsersLoading(false);
      } catch (err) {
        setError(err.message);
        setUsersLoading(false);
      }
    };
    getUsersData();
  }, []); // Fetch users only once

  const handleAddFriend = async (friend) => {
    const token = localStorage.getItem('token');
    const friendId = friend._id;

    try {
      const response = await fetch(`${baseURL}/api/friends/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, friendId }),
      });

      if (!response.ok) {
        throw new Error('An error occurred while adding a friend');
      }

      const result = await response.json();
      friendsDispatch({ type: 'ADD_FRIEND', payload: result });

      if(!hasFriends){
        authDispatch({ type: 'UPDATE_USER', payload: { hasFriends: true}})
      }

      const newUsers = users.filter((user)=> user._id !== friendId);
      setUsers(newUsers);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRemoveFriend = async (friend) => {
    const token = localStorage.getItem('token');
    const friendId = friend._id;
    try {
      const response = await fetch(`${baseURL}/api/friends/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, friendId }),
      });

      if (!response.ok) {
        throw new Error('An error occurred while removing a friend');
      }
      const result = await response.json();

      friendsDispatch({ type: 'REMOVE_FRIEND', payload: { _id: friendId } });

      setUsers((prev)=>[...prev, result]);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Layout>
    <div className="app-network">
      <div className="app-friends">
        <h1>Your friends</h1>
        <ul>
          {isFriendsLoading ? <h4>Loading..</h4> :
            friendsList.length > 0 ?
            friendsList.map((friend) => (
              <li key={friend._id}>
                <h3>{friend.username}</h3>
                <button onClick={() => handleRemoveFriend(friend)}>Remove friend</button>
              </li>
            )) : <h4>You dont have any friends</h4> 
          }
        </ul>
      </div>
      <div className="app-existing-friends">
        <h1>Friend suggestions</h1>
        <ul>
          {isUsersloading ? <h1>Loading...</h1> : users.length === 0 ? <h4>No friend suggestions</h4> :  users.map((user) => (
            <li key={user._id}>
              <h3>{user.username}</h3>
              <button onClick={() => handleAddFriend(user)}>Add friend</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </Layout>
  );
}

export default Network;
