export enum UserVerifyStatus {
  Unverified, //chưa xác thực email mặc định bằng 0
  verified, //đã xác thực email
  Banned //bị khóa
}
export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}

export enum MediaType {
  Image,
  Video,
  HLS
}

export enum MediaTypeQuery {
  Image = 'image',
  Video = 'video'
}

export enum EncodingStatus {
  Pending, // Đang chờ ở hàng đợi (chưa được encode)
  Processing, // Đang encode
  Success, // Encode thành công
  Failed // Encode thất bại
}

export enum TweetAudience {
  Everyone, // 0
  TwitterCircle // 1
}

export enum TweetType {
  Tweet,
  Retweet,
  Comment,
  QuoteTweet
}
