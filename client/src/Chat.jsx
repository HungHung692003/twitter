import { useEffect, useState, useCallback } from "react";
import socket from "./socket";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';

// Lấy thông tin người dùng hiện tại từ localStorage
const profile = JSON.parse(localStorage.getItem('profile')); // Người đăng nhập hiện tại

const LIMIT = 10; // Giới hạn số lượng cuộc hội thoại mỗi lần tải

export default function Chat() {
  const [value, setValue] = useState(''); // Trạng thái lưu giá trị của tin nhắn đang nhập
  const [conversations, setConversations] = useState([]); // Trạng thái lưu danh sách cuộc hội thoại
  const [receiver, setReceiver] = useState(''); // Trạng thái lưu ID của người nhận
  const [users, setUsers] = useState([]); // Danh sách người dùng khác
  const [pagination, setPagination] = useState({
    page: 1, // Trang hiện tại
    total_page: 0, // Tổng số trang
  });

  // Lấy danh sách người dùng từ hệ thống khi component được mount
  useEffect(() => {
    axios.get('/api/listUsers', {
      baseURL: import.meta.env.VITE_API_URL, // Lấy baseURL từ biến môi trường
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Gửi token xác thực
      },
    })
    .then(({ data }) => {
      setUsers(data.result); // Giả định `data.result` là danh sách người dùng
    })
    .catch((error) => {
      console.log('Lỗi khi tìm kiếm người dùng', error); // Xử lý lỗi nếu có
    });
  }, []);

  // Hàm để thiết lập người nhận dựa vào ID của người dùng khác
  const getProfile = (userId) => {
    setReceiver(userId); // Cập nhật ID người nhận
    const selectedUser = users.find(user => user._id === userId); // Tìm thông tin người dùng
    alert(`Bây giờ bạn có thể trò chuyện với ${selectedUser.name}`); // Thông báo người dùng đã được chọn
  };

  // Thiết lập các sự kiện socket
  useEffect(() => {
    socket.on('receive_message', ({ payload }) => {
      // Khi nhận tin nhắn mới từ socket
      setConversations((prev) => [...prev, payload]); // Cập nhật danh sách cuộc hội thoại
    });

    socket.on('connect_error', (err) => {
      console.log(err.data); // Xử lý lỗi kết nối
    });

    socket.on('disconnect', (reason) => {
      console.log(reason); // Xử lý khi bị ngắt kết nối
    });

    return () => {
      socket.disconnect(); // Ngắt kết nối socket khi component bị unmount
    };
  }, []);

  // Khi người nhận thay đổi, tải cuộc trò chuyện
  useEffect(() => {
    if (receiver) {
      fetchConversations(receiver, 1); // Tải cuộc trò chuyện cho người nhận được chọn
    }
  }, [receiver]);

  // Tải cuộc trò chuyện từ server
  const fetchConversations = async (receiverId, page) => {
    try {
      const { data } = await axios.get(`/conversations/receivers/${receiverId}`, {
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Gửi token xác thực
        },
        params: { limit: LIMIT, page }, // Tham số giới hạn và trang
      });

      const { conversations, totalPage } = data.result; // Lấy danh sách cuộc hội thoại và tổng số trang từ phản hồi
      setConversations(conversations); // Cập nhật danh sách cuộc hội thoại
      setPagination({ page, total_page: totalPage }); // Cập nhật trạng thái phân trang
    } catch (error) {
      console.log('Lỗi khi tải cuộc trò chuyện', error); // Xử lý lỗi khi tải
    }
  };

  // Tải thêm cuộc hội thoại khi cuộn
  const fetchMoreConversations = () => {
    if (receiver && pagination.page < pagination.total_page) {
      fetchConversations(receiver, pagination.page + 1); // Tải thêm cuộc hội thoại nếu còn trang
    }
  };

  // Gửi tin nhắn
  const send = useCallback((e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    if (!value) return; // Không gửi tin nhắn nếu không có nội dung

    const conversation = {
      content: value, // Nội dung tin nhắn
      sender_id: profile._id, // ID người gửi (người đăng nhập)
      receiver_id: receiver, // ID người nhận
    };

    socket.emit('send_message', { payload: conversation }); // Gửi tin nhắn qua socket

    setConversations((prev) => [
      ...prev,
      { ...conversation, _id: new Date().getTime() }, // Thêm tin nhắn mới vào danh sách cuộc hội thoại
    ]);
    setValue(''); // Xóa nội dung ô nhập tin nhắn
  }, [value, receiver]);

  return (
    <div>
      <h1>Chat</h1>

      <div>
        <h2>Chọn người để trò chuyện:</h2>
        {users.map((user) => (
          <div key={user._id}>
            <button onClick={() => getProfile(user._id)}>
              {user.name} {/* Hiển thị tên người dùng */}
            </button>
          </div>
        ))}
      </div>

      <div
        id="scrollableDiv"
        style={{ height: 200, overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}
      >
        <InfiniteScroll
          dataLength={conversations.length} // Số lượng cuộc hội thoại hiện tại
          next={fetchMoreConversations} // Hàm tải thêm cuộc hội thoại
          style={{ display: 'flex', flexDirection: 'column-reverse' }} // Đảo ngược chiều hiển thị
          inverse={true} // Thiết lập để cuộn lên
          hasMore={pagination.page < pagination.total_page} // Kiểm tra xem còn trang để tải thêm
          loader={<h4>Loading...</h4>} // Hiển thị khi đang tải
          scrollableTarget="scrollableDiv" // Mục để cuộn
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
