import { TokenPayload } from '../models/requests/Users.Requests'
import { BookmankTweetReqBody } from '../models/requests/Bookmark.requests'
import { Response } from 'express'
import CustomRequest from '../type'
import bookmarkService from '../services/bookmarks.service'
import { BOOKMARK_MESSAGES } from '../constants/Messager'

export const bookmarkTweetController = async (req: CustomRequest<BookmankTweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await bookmarkService.bookmarkTweet(user_id, req.body.tweet_id)
  return res.json({
    message: BOOKMARK_MESSAGES.BOOKMARK_SUCCESSFULLY,
    result
  })
}

export const unbookmarkTweetController = async (req: CustomRequest, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await bookmarkService.unbookmarkTweet(user_id, req.params.tweet_id)
  return res.json({
    message: BOOKMARK_MESSAGES.UNBOOKMARK_SUCCESSFULLY,
    result
  })
}
