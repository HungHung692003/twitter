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
  Video
}
