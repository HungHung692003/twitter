import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

import { initFolder } from './../utils/file'
import databaseService from './services/database.services'
import UserRouter from './routes/users.routes'
import mediasRouter from './routes/medias.routes'
import staticRouter from './routes/static.routes'
import tweetsRouter from './routes/tweets.router'
import bookmarksRouter from './routes/bookmarks.routes'
import likesRouter from './routes/likes.routes'
import searchRouter from './routes/search.routes'
import { defaultErrorHandler } from './middlewares/ErrorHandler'
import { UPLOAD_VIDEO_DIR } from './constants/dir'

config()

// Kết nối database và khởi tạo các chỉ số
databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexVideoStatus()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})

const app = express()
const port = process.env.PORT || 3000
const httpServer = createServer(app) // Gán app vào httpServer

// Khởi tạo folder uploads nếu chưa tồn tại
initFolder()

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:3001', // Địa chỉ của frontend
    credentials: true // Cho phép gửi cookie
  })
)

// Middleware để parse JSON
app.use(express.json())

// Đăng ký các route API
app.use('/api', UserRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarksRouter)
app.use('/likes', likesRouter)
app.use('/search', searchRouter)

// Xử lý lỗi mặc định
app.use(defaultErrorHandler)

// Socket.io server với CORS configuration
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3001' // Địa chỉ của client
  }
})

io.on('connection', (socket: Socket) => {
  console.log(`Người dùng ${socket.id} đã kết nối`)

  // Lắng nghe sự kiện từ client
  socket.on('client', (data) => {
    console.log(data)
  })

  // Gửi sự kiện đến client
  socket.emit('server', {
    message: `Server kết nối thành công Client có ID: ${socket.id}`
  })

  socket.on('disconnect', () => {
    console.log(`Người dùng ${socket.id} đã ngắt kết nối`)
  })
})

// Khởi chạy server
httpServer.listen(port, () => {
  console.log(`Server đang chạy ở: http://localhost:${port}/`)
})
