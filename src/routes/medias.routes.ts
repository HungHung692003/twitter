import { Router } from 'express'
import { uploadImageController, uploadVideoController } from '../controllers/medias.controllers'
import { wrapRequestHandler } from '../../utils/handlerl'
import { accessTokenValidatetor, verifiedUserValidator } from '../middlewares/users.middlewares'
const mediasRouter = Router()

mediasRouter.post(
  '/upload-image',
  accessTokenValidatetor,
  verifiedUserValidator,
  wrapRequestHandler(uploadImageController)
)

mediasRouter.post(
  '/upload-video',
  accessTokenValidatetor,
  verifiedUserValidator,
  wrapRequestHandler(uploadVideoController)
)

export default mediasRouter
