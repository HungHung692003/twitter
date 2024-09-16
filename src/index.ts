import { initFolder } from './../utils/file'
//import DatabaseService from './services/database.services'
import UserRouter from './routes/users.routes'
import express from 'express'
import { defaultErrorHandler } from './middlewares/ErrorHandler'
import mediasRouter from './routes/medias.routes'
import { config } from 'dotenv'
import staticRouter from './routes/static.routes'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import cors from 'cors'
import tweetsRouter from './routes/tweets.router'
import bookmarksRouter from './routes/bookmarks.routes'
import likesRouter from './routes/likes.routes'
import databaseService from './services/database.services'
import searchRouter from './routes/search.routes'

//import '../utils/fake' : vđể thêm mới người dùng và Follower khi mỗi lần chạy lại SERVER
// chỉ khi nào vần thêm thì "BẬT" import '../utils/fake' lên
//import '../utils/fake'

config()

databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexVideoStatus()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

initFolder() // nếu trong server chưa có file " uploads " chỉ cần chạy lại server thì tạo lại 1 file mới

app.use(
  cors({
    origin: 'http://localhost:3001', // Địa chỉ của ứng dụng frontend
    credentials: true // Cho phép gửi cookie cùng với request
  })
)

app.use(express.json())

// Middleware để phục vụ các file tĩnh
//app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())

app.use('/api', UserRouter)

app.use('/medias', mediasRouter)

//router ảnh
app.use('/static', staticRouter)
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))

//Tweets
app.use('/tweets', tweetsRouter)
//Bookmarks
app.use('/bookmarks', bookmarksRouter)
//Likes
app.use('/likes', likesRouter)

//Search
app.use('/search', searchRouter)

app.use(defaultErrorHandler)

//database
//DatabaseService.connect()

app.listen(port, () => {
  console.log(`Server đang chạy ở: http://localhost:${port}/`)
})
