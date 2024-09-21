import { useEffect, useState, useCallback } from "react";
import socket from "./socket";
import axios from "axios";

const profile = JSON.parse(localStorage.getItem('profile'));

// Mặc định danh sách username để test
const username = [
  { name: 'user1', value: '66e281119a857456cc98ffba' },
  { name: 'user2', value: '66e281c99a857456cc98ffc1' }
];

export default function Chat() {
  const [value, setValue] = useState('');
  const [conversations, setConversations] = useState([]);
  const [receiver, setReceiver] = useState('');

  const getProfile = async (username) => {
    try {
      const res = await axios.get(`/api/profile/${username}`, {
        baseURL: import.meta.env.VITE_API_URL,
      });
      setReceiver(res.data.result._id);
      alert(`Bây giờ bạn có thể trò chuyện với ${res.data.result.name}`);
    } catch (error) {
      console.error('Lỗi khi lấy profile:', error);
    }
  };

  useEffect(() => {
    socket.auth = { _id: profile._id };
    socket.connect();

    socket.on('receive_message', (data) => {
      const { payload } = data;
      setConversations((conversations) => [...conversations, payload]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (receiver) {
      axios.get(`/conversations/receivers/${receiver}`, {
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: { limit: 10, page: 1 }
      })
      .then((res) => {
        setConversations(res.data.result.conversations);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy cuộc trò chuyện:', error);
      });
    }
  }, [receiver]);

  const send = useCallback((e) => {
    e.preventDefault();
    
    if (!value) return; // Kiểm tra xem giá trị có rỗng không

    const conversation = {
      content: value,
      sender_id: profile._id,
      receiver_id: receiver
    };
    
    socket.emit('send_message', { payload: conversation });
    
    setConversations((conversations) => [
      ...conversations,
      { ...conversation, _id: new Date().getTime() }
    ]);

    setValue(''); // Xóa nội dung input sau khi gửi
  }, [value, receiver]);

  return (
    <div>
      <h1>Chat</h1>

      <div>
        {username.map((user) => (
          <div key={user.name}>
            <button onClick={() => getProfile(user.value)}>
              {user.name}
            </button>
          </div>
        ))}
      </div>

      <div className="chat">
        {conversations.map((conversation) => (
          <div key={conversation._id}>
            <div className='message-container'>
              <div className={
                'message ' + (conversation.sender_id === profile._id ? 'message-right' : '')
              }>
                {conversation.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={send}>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="Enter your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
