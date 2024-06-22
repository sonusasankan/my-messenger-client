import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FriendsContext } from "../../store";

function FriendsList({ selectFriend, selected }) {
  const friendsData = useContext(FriendsContext);
  const { friendsList, loading, dataLoaded, error } = friendsData;
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataLoaded && friendsList.length === 0) {
      setIsEmpty(true);
      navigate("/");
    } else {
      setIsEmpty(false);
    }
  }, [friendsList, dataLoaded]);

  if (loading) {
    return(
      <div className="app-mychat-people">
        <ul className="app-mychat-people_list">
          <li className="app-mychat-people_list-item">
            <h4>Your friends list is loading...</h4>
          </li>
        </ul>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!dataLoaded) {
    return(
      <div className="app-mychat-people">
        <ul className="app-mychat-people_list">
          <li className="app-mychat-people_list-item">
            <h4>Data loading...</h4>
          </li>
        </ul>
      </div>
    ); // You can customize this message or use a spinner
  }

  if (isEmpty) {
    return(
      <div className="app-mychat-people">
        <ul className="app-mychat-people_list">
          <li className="app-mychat-people_list-item">
            <h4>You dont have any friends yet</h4>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className="app-mychat-people">
      <ul className="app-mychat-people_list">
        {friendsList.map((friend) => (
            <li
              className={`app-mychat-people_list-item ${
                selected && selected._id === friend._id ? "active" : ""
              }`}
              key={friend._id}
              onClick={() => selectFriend(friend)}
            >
              <h4>{friend.username}</h4>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FriendsList;
