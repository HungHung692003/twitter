import { TokenPayload } from '../models/requests/Users.Requests'
import { TweetRequestBody } from '../models/requests/Tweer.requests'
import tweetsService from '../services/tweets.services'
import { Response } from 'express'
import CustomRequest from '../type'

export const createTweetController = async (req: CustomRequest<TweetRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetsService.createTweet(user_id, req.body)
  return res.json({
    message: 'Tạo Tweet thành công',
    result
  })
}

export const getTweetController = async (req: CustomRequest, res: Response) => {
  const result = await tweetsService.increaseView(req.params.tweet_id, req.decoded_authorization?.user_id)
  const tweet = {
    ...req.tweet,
    guest_views: result.guest_views,
    user_views: result.user_views
  }
  return res.json({
    message: 'GET Tweet thành công',
    result: tweet
  })
}
