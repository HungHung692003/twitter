import { config } from 'dotenv' // để sử dụng được biến môi trường env
import { MongoClient, Db, Collection } from 'mongodb'
import User from '../models/schemas/User.schema'
import RefreshToken from '../models/schemas/ResfestToken.Schema'
import Followers from '../models/schemas/Follower.schema'

config() // config(): Chức năng này đọc tệp .env và làm cho nội dung của nó có sẵn thông qua process.env

// sử dụng process để trỏ đến file env để sử dụng tài nguyên từ file đó
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.jdianmg.mongodb.net/?retryWrites=true&w=majority&appName=Twitte`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri) //tạo đường dẩn kết nối đến database theo uri(twitter.jdianmg.mongodb.net)
    this.db = this.client.db(process.env.DB_NAME) //chọn ra tên của database cần sử dụng gán vào db
  }

  async connect() {
    try {
      // kết nối từ client đến server
      // await được sử dụng để chờ một Promise. Nó chỉ có thể được sử dụng bên trong một khối async
      await this.db.command({ ping: 1 })
      console.log('Đã ping quá trình triển khai của bạn. Bạn đã kết nối thành công với MongoDB!')
    } catch (error) {
      console.log('Erorr', error)
      throw error
    }
  }
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }

 //Nếu collection với tên chỉ định bởi process.env.DB_USERS_COLLECTION đã tồn tại trong cơ sở dữ liệu, thì phương thức này sẽ trả về đối tượng Collection<User> để bạn có thể thao tác với collection đó (DB_REFESH_TOKENS_COLLECTION) trên database.
 //Nếu collection chưa tồn tại, MongoDB sẽ tự động tạo mới collection đó khi bạn thực hiện thao tác ghi
  get refeshToken(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFESH_TOKENS_COLLECTION as string)
  }
  get followers(): Collection<Followers> {
    return this.db.collection(process.env.DB_FOLLOWERS_CQLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
