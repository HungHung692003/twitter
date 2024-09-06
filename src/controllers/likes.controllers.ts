import { TokenPayload } from '../models/requests/Users.Requests'
import { Response } from 'express'
import CustomRequest from '../type'
import { LIKES_MESSAGES } from '../constants/Messager'
import likesService from '../services/likes.service'
import { LikesTweetReqBody } from '../models/requests/Likes.requests'

export const likesTweetController = async (req: CustomRequest<LikesTweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorizations as TokenPayload
  const result = await likesService.likesTweet(user_id, req.body.tweet_id)
  return res.json({
    message: LIKES_MESSAGES.LIKES_SUCCESSFULLY,
    result
  })
}

export const unlikesTweetController = async (req: CustomRequest<LikesTweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorizations as TokenPayload
  const result = await likesService.unlikesTweet(user_id, req.body.tweet_id)
  return res.json({
    message: LIKES_MESSAGES.UNLIKES_SUCCESSFULLY,
    result
  })
}
