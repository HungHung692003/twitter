import { useEffect } from "react"
import { io } from "socket.io-client"

export default function Chat() {
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL);
    socket.on("connect", () => {
      console.log(socket.id);
      //socket.emit: Gửi một sự kiện client đến server
      socket.emit("client", "Client kết nối Server thành công");
      //socket.on: Lắng nghe sự kiện của server.
      socket.on('server', (data) => {
        console.log(data)
      })
    });

    socket.on("disconnect", () => {
      console.log(socket.id);
    });

    return () => {
      socket.disconnect()
    }

  }, [])
  return <div>Chat</div>
}