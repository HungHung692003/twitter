import {
  accessTokenValidatetor,
  isUserLoggedInValidator,
  verifiedUserValidator
} from '../middlewares/users.middlewares'
import { Router } from 'express'
import { wrapRequestHandler } from '../../utils/handlerl'
import {
  createTweetController,
  getNewFeedsController,
  getTweetChildrenController,
  getTweetController
} from '../controllers/tweets.controllers'
import {
  audienceValidator,
  createTweetValidator,
  getTweetChildrenValidator,
  paginationValidator,
  tweetIdValidator
} from '../middlewares/tweets.middlewares'

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

/**
 * Description: Get Tweet Children
 * Path: /:tweet_id/children
 * Method: GET
 * Header: { Authorization ?: Bearer <access_token> }
 * Query: {limit: number, page: number, tweet_type: TweetType}
 */
tweetsRouter.get(
  '/:tweet_id/children',
  tweetIdValidator,
  paginationValidator,
  getTweetChildrenValidator,
  isUserLoggedInValidator(accessTokenValidatetor),
  isUserLoggedInValidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetChildrenController)
)

/**

* Description: Get new feeds
* Path: /new-feeds

* Method: GET
* Header: { Authorization: Bearer <access_token> }
* Query: { limit: number, page: number }
*/
tweetsRouter.get(
  '/',
  paginationValidator,
  accessTokenValidatetor,
  verifiedUserValidator,
  wrapRequestHandler(getNewFeedsController)
)

export default tweetsRouter
