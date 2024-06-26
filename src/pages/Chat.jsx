//layout
import Layout from "../layout/Layout.jsx";

//components
import ChatWindow from "../components/ui/ChatWindow";
import FriendsList from "../components/ui/FriendsList";

const Chat = ({
  selectFriend,
  selected,
  onSendMessage,
  name,
  loadMoreMessages,
  hasMore,
}) => {
  return (
    <Layout>
      <div className="app-mychat">
        <div className="app-mychat-chatbox">
          <FriendsList
            selectFriend={selectFriend}
            selected={selected}
          ></FriendsList>
          <ChatWindow
            onSendMessage={onSendMessage}
            name={name}
            loadMoreMessages={loadMoreMessages}
            hasMore={hasMore}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
