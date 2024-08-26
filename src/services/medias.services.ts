import { Media } from './../models/Other'
import { MediaType } from './../constants/enums'
import { Request } from 'express'
import { getNameFromFullname, handleUploadImage, handleUploadVideo } from './../../utils/file'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '../constants/dir'
import path from 'path'
import fs from 'fs'
import { isProduction } from '../constants/config'
import { config } from 'dotenv'

config()

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        await sharp(file.filepath) // Tạo đối tượng sharp với filepath
          .jpeg() // Cấu hình thành định dạng JPEG
          .toFile(newPath) // Lưu kết quả thành file 'test.jpg'
        fs.unlinkSync(file.filepath) //xóa ảnh đã được Upload trên khổi file uploads/temp (bộ nhớ tạm)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${newName}.jpg`
            : `http://localhost:${process.env.PORT}/static/image/${newName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return result
  }

  async uploadVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const result: Media[] = files.map((file) => {
      return {
        url: isProduction
          ? `${process.env.HOST}/static/video/${file.newFilename}`
          : `http://localhost:${process.env.PORT}/static/video/${file.newFilename}`,
        type: MediaType.Video
      }
    })
    return result
  }
}

const mediasService = new MediasService()

export default mediasService
