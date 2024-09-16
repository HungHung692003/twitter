import { Router } from 'express'
import { searchController } from '../controllers/search.controllers'
import { accessTokenValidatetor, verifiedUserValidator } from '../middlewares/users.middlewares'
import { searchValidator } from '../middlewares/search.middlewares'

const searchRouter = Router()

searchRouter.get('/', accessTokenValidatetor, verifiedUserValidator, searchValidator, searchController)

export default searchRouter
