import { Router } from 'express'
import { searchController } from '../controllers/search.controllers'
import { accessTokenValidatetor, verifiedUserValidator } from '../middlewares/users.middlewares'

const searchRouter = Router()

searchRouter.get('/', accessTokenValidatetor, verifiedUserValidator, searchController)

export default searchRouter
