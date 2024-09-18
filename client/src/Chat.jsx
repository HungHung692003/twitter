import { useEffect, useState } from "react";
import socket from "./socket";

const profile = JSON.parse(localStorage.getItem('profile'))

export default function Chat() {


  const [value, setValue] = useState(''); // Quản lý trạng thái input
  const [messages, setMessages] = useState([]); // Quản lý các tin nhắn nhận được

  useEffect(() => {
    socket.auth = {
      _id: profile._id
    }

    socket.connect()

    socket.on('receive private message', (data) => {
      const content = data.content
      // Thêm tin nhắn mới vào danh sách tin nhắn
      setMessages((messages) => [...messages, content]);
    })

    // Cleanup khi component bị unmount
    return () => {
      socket.disconnect()
    }
  }, [])

  // Xử lý sự kiện submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('private message', {
      content: value,
      to: '66e281c99a857456cc98ffc1'// ID của người nhận của client 2
    })
    setValue('')// Xóa nội dung input sau khi gửi
  }

  return (
    <div>
      <h1>Chat</h1>
      <div>

        {messages.map((message, index) => (
          <div key={index}>
            <div>{message}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}