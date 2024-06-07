import { useContext } from "react";
import { FriendsContext } from "../../store";

function FriendsList({ selectFriend, selected }) {
  const friendsData = useContext(FriendsContext);

  return (
    <div className="app-mychat-people">
      <ul className="app-mychat-people_list">
        {friendsData.map((friend) => (
          <li
            className={`app-mychat-people_list-item ${
              selected._id === friend._id ? "active" : ""
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
