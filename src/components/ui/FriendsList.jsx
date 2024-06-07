import { useContext } from "react";
import { FriendsContext } from "../../store";

function FriendsList({ selectFriend, selected }) {
  const friends = useContext(FriendsContext);

  return (
    <div className="app-mychat-people">
      <ul className="app-mychat-people_list">
        {friends.map((friend) => (
          <li
            className={`app-mychat-people_list-item ${
              selected._id == friend._id ? "active" : ""
            }`}
            key={friend._id}
            onClick={() => selectFriend(friend)}
          >
            {friend.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendsList;
