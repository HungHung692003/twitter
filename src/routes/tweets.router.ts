import {
  accessTokenValidatetor,
  isUserLoggedInValidator,
  verifiedUserValidator
} from '../middlewares/users.middlewares'
import { Router } from 'express'
import { wrapRequestHandler } from '../../utils/handlerl'
import { createTweetController, getTweetController } from '../controllers/tweets.controllers'
import { audienceValidator, createTweetValidator, tweetIdValidator } from '../middlewares/tweets.middlewares'

const tweetsRouter = Router()

/**
 * Description: Create Tweet
 * Path: /
 * Method: POST
 * Body: TweetRequestBody
 **/
tweetsRouter.post(
  '/',
  accessTokenValidatetor,
  verifiedUserValidator,
  createTweetValidator,
  wrapRequestHandler(createTweetController)
)

/**
Description: Get Tweet detail
Path: /:tweet_id
Method: GET
Header: { Authorization ?: Bearer <access_token> }
*/

tweetsRouter.get(
  '/:tweet_id',
  tweetIdValidator,
  isUserLoggedInValidator(accessTokenValidatetor),
  isUserLoggedInValidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetController)
)

export default tweetsRouter
