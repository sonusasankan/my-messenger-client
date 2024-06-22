//layout
import Layout from "../layout/Layout.jsx";

//components
import ChatWindow from "../components/ui/ChatWindow";
import FriendsList from "../components/ui/FriendsList";

const Chat = ({
  selectFriend,
  selected,
  setCurrentMessage,
  currentMessage,
  onSendMessage,
  name,
  messages,
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
            setCurrentMessage={setCurrentMessage}
            currentMessage={currentMessage}
            onSendMessage={onSendMessage}
            name={name}
            messages={messages}
            loadMoreMessages={loadMoreMessages}
            hasMore={hasMore}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
