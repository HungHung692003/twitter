import { ObjectId, WithId } from 'mongodb'
import databaseService from './database.services'
import Likes from '../models/schemas/Like.schema'

class LikesService {
  async likeTweet(user_id: string, tweet_id: string): Promise<WithId<Likes> | null> {
    const result = await databaseService.likes.findOneAndUpdate(
      {
        user_id: new ObjectId(user_id),
        tweet_id: new ObjectId(tweet_id)
      },
      {
        $setOnInsert: new Likes({
          user_id: new ObjectId(user_id),
          tweet_id: new ObjectId(tweet_id)
        })
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )
    return result
  }

  async unlikeTweet(user_id: string, tweet_id: string): Promise<WithId<Likes> | null> {
    const result = await databaseService.likes.findOneAndDelete({
      user_id: new ObjectId(user_id),
      tweet_id: new ObjectId(tweet_id)
    })
    return result
  }
}

const likesService = new LikesService()
export default likesService
