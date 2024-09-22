import { useEffect, useState, useCallback } from "react";
import socket from "./socket";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';

const profile = JSON.parse(localStorage.getItem('profile'));

const LIMIT = 10;
const PAGE = 1;

export default function Chat() {
  const [value, setValue] = useState('');
  const [conversations, setConversations] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  });

// Mặc định danh sách username để test
const username = [
  { name: 'user1', value: '66e281119a857456cc98ffba' },
  { name: 'user2', value: '66e281c99a857456cc98ffc1' }
];

  const getProfile = async (username) => {
    const { data } = await axios.get(`/api/profile/${username}`, {
      baseURL: import.meta.env.VITE_API_URL,
    });
    setReceiver(data.result._id);
    alert(`Bây giờ bạn có thể trò chuyện với ${data.result.name}`);
  };

  useEffect(() => {
    socket.on('receive_message', ({ payload }) => {
      setConversations((prev) => [...prev, payload]);
    });

    socket.on('connect_error', (err) => {
      console.log(err.data)
    })

    socket.on('disconnect', (reason) => {
      //lỗi mất kết nối dùng để làm thông cho người dùng
      console.warn(reason)
    })

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
        params: { limit: LIMIT, page: PAGE }
      }).then(({ data }) => {
        const { conversations, page, total_page } = data.result;
        setConversations(conversations);
        setPagination({ page, total_page });
      });
    }
  }, [receiver]);

  const fetchMoreConversations = () => {
    if (receiver && pagination.page < pagination.total_page) {
      axios.get(`/conversations/receivers/${receiver}`, {
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: { limit: LIMIT, page: pagination.page + 1 }
      }).then(({ data }) => {
        const { conversations, page, total_page } = data.result;
        setConversations((prev) => [...prev, ...conversations]);
        setPagination({ page, total_page });
      });
    }
  };

  const send = useCallback((e) => {
    e.preventDefault();
    
    if (!value) return;

    const conversation = {
      content: value,
      sender_id: profile._id,
      receiver_id: receiver
    };

    socket.emit('send_message', { payload: conversation });

    setConversations((prev) => [
      ...prev,
      { ...conversation, _id: new Date().getTime() },
        
    ]);
    setValue('');
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

      <div
        id="scrollableDiv"
        style={{ height: 200, overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}
      >
        <InfiniteScroll
          dataLength={conversations.length}
          next={fetchMoreConversations}
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
          inverse={true}
          hasMore={pagination.page < pagination.total_page}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {conversations.map((conversation) => (
            <div key={conversation._id} className='message-container'>
              <div className={'message ' + (conversation.sender_id === profile._id ? 'message-right' : '')}>
                {conversation.content}
              </div>
            </div>
          ))}
        </InfiniteScroll>
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
