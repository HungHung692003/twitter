export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Lỗi xác nhận',
  NAME_IS_REQUIRED: 'Tên là bắt buộc',
  NAME_MUST_BE_A_STRING: 'Tên phải là một chuỗi',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'ĐỘ DÀI TÊN PHẢI TỪ 1 ĐẾN 100',
  EMAIL_ALREADY_EXSTS: 'EMAIL đã tồn tại',
  EMAIL_IS_REQUIREA: 'EMAIL LÀ YÊU CẦU',
  EMAIL_IS_INVALID: 'EMAIL KHÔNG HỢP LỆ',
  USERS_NOT_FOUND: 'Không tìm thấy USERS',
  USERS_OR_PASSWORD_IS_INCORRECT: 'EMAIL OR PASSWORD KHÔNG HỢP LỆ',
  PASSWORD_IS_REQUIREA: 'PASSWORD LÀ YÊU CẦU',
  PASSWORD_MUST_BE_A_STRING: 'MẬT KHẨU PHẢI LÀ MỘT CHUỖI',
  PASSWORD_LENGTH_MUST_FROM_6_TO_50: 'ĐỘ DÀI MẬT KHẨU PHẢI TỪ 6 ĐẾN 50',
  PASSWORD_MUST_BE_A_STRONG:
    'MẬT KHẨU PHẢI dài từ 6-50 ký tự và chứa ít nhất 1 chữ cái thường, 1 chữ cái in hoa, 1 chữ số, 1 ký hiệu',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Yêu cầu xác nhận mật khẩu',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Xác nhận mật khẩu phải là một chuỗi',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Độ dài mật khẩu xác nhận phải từ 6 đến 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Xác nhận mật khẩu phải dài từ 6-50 ký tự và chứa ít nhất 1 chữ cái thường, 1 chữ cái viết hoa, 1 số và 1 ký hiệu',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Xác nhận mật khẩu nhập lại không khớp với mật khẩu ban đầu',
  DATE_OF_BIRTH_MUST_BE_IS08601: 'Ngày sinh phải là IS08601',
  LOGIN_SUCCESS: 'Login thành công',
  REGISTER_SUCCESS: 'Register thành công',
  ACCESS_TOKEN_IS_INVALID: 'ACCESS TOKEN  KHÔNG HỢP LỆ',
  ACCESS_TOKEN_IS_REQUIRED: 'MÃ TRUY CẬP  ACCESS_TOKEN LÀ BẮT BUỘC',
  REFRESH_TOKEN_IS_REQUIRED: 'MÃ TRUY CẬP REFRESH_TOKEN LÀ BẮT BUỘC',
  LOGOUT_SUCCESS: 'ĐĂNG XUẤT THÀNH CÔNG',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'ĐÃ SỬ DỤNG REFRESH TOKEN HOẶC KHÔNG TỒN TẠI',
  INVALID_TOKEN: 'MÃ THÔNG BÁO KHÔNG HỢP LỆ',
  SEARCH_FOR_SUCCESS: 'TIM KIẾM THÀNH CÔNG',
  EMAIL_VRIFYLE_TOKEN_IS_REQUIRED: 'YÊU CẦU MÃ THÔNG BÁO VREIFY EMAIL',
  EMAIL_VERIFY_SUCCESS: 'XÁC MINH EMAIL THÀNH CÔNG',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'EMAIL ĐÃ ĐƯỢC XÁC MINH TRƯỚC ĐÓ',
  RESEND_MESSAGE_EMAIL_SUCCESS: 'GỬI EMAIL THÀNH CÔNG',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'KIỂM TRA EMAIL ĐỂ ĐỔI MẬT KHẨU',
  INVALID_FORGOT_PASSWORD_TOKEN: 'MÃ TOKEN QUÊN MẬT KHẨU KHÔNG HỢP LỆ',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'YÊU CẦU MÃ TOKEN BẮT BUỘC ',
  RESET_PASSWORD_SUCCESS: 'THAY ĐỔI MẬT KHẨU THÀNH CÔNG',
  VERIFY_FORGOT_PASSWORD_SUCCESS: 'XÁC THỰC QUÊN MẬT KHẨU THÀNH CÔNG',
  GET_ME_SUCCESS: 'TRUY CẬP THÔNG TIN THÀNH CÔNG',
  USER_NOT_VERIFIED: 'NGƯỜI DÙNG CHƯA XÁC THỰC EMAIL',
  UPDATE_ME_SUCCESS: 'CẬP NHẬT THÔNG TIN CÁ NHÂN THÀNH CÔNG',
  BIO_MUST_BE_STRING: 'BIO_PHẢI_LÀ_CHUỖI',
  BIO_LENGTH: 'BIO_PHẢI DÀI TỪ 1-200 KÝ TỰ',
  LOCATION_MUST_BE_STRING: 'VỊ TRÍ_PHẢI_LÀ_CHUỖI',
  LOCATION_LENGTH: 'ĐỘ DÀI VỊ TRÍ',
  WEBSITE_MUST_BE_STRING: 'TRANG WEB PHẢI LÀ CHUỖI',
  WEBSITE_LENGTH: 'ĐỘ DÀI TRANG WEB',
  USERNAME_MUST_BE_STRING: 'TÊN NGƯỜI DÙNG PHẢI LÀ CHUỖI',
  USERNAME_INVALID: 'TÊN NGƯỜI DÙNG KHÔNG HỢP LỆ',
  USERNAME_EXISTE: 'TÊN NGƯỜI DÙNG TỒN TẠI',
  IMAGE_URL_MUST_BE_STRING: 'IMAGE_URL_PHẢI_LÀ_CHUỖI:',
  IMAGE_URL_LENGTH: 'ĐỘ DÀI URL ẢNH',
  FOLLOW_SUCCESS: 'FOLLOW THÀNH CÔNG',
  FOLLOW: 'THEO DỎI',
  INVALID_FOLLOWED_USER_ID: 'ID USER KHÔNG ĐÚNG ĐỊNH DẠNG',
  UNFOLLOWED_SUCCESS: 'HỦY FOLLOW THÀNH CÔNG',
  ALREADY_UNFOLLOWED: 'ĐÃ BỎ THEO DỎI',
  OLD_PASSWORD_NOT_MATCH: 'MẬT KHẨU CŨ KHÔNG KHỚP',
  CHANGE_PASSWORD_SUCCESS: 'THAY ĐỔI PASSWORD THÀNH CÔNG',
  UPLOAD_SUCCESS: 'UPLOAD Thành Công',
  GET_VIDEO_STATUS_SUCCESS: 'NHẬN TRẠNG THÁI VIDEO THÀNH CÔNG'
} as const

export const TWEETS_MESSAGES = {
  INVALID_TYPE: 'Loại không hợp lệ',
  INVALID_AUDIENCE: 'Đối tượng không hợp lệ',
  PARENT_ID_MUST_BE_A_VALID_TWEET_ID: 'ID PHỤ HUYNH PHẢI LÀ ID TWEET HỢP LỆ',
  PARENT_ID_MUST_BE_NULL: 'ID PHỤ HUYNH PHẢI LÀ NULL',
  CONTENT_MUST_BE_A_NON_EMPTY_STRING: 'NỘI DUNG PHẢI LÀ MỘT CHUỖI KHÔNG RỖNG',
  CONTENT_MUST_BE_EMPTY_STRING: 'NỘI DUNG PHẢI LÀ MỘT CHUỖI RỖNG',
  HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING: 'HASHTAGS PHẢI LÀ MỘT MẢNG CHUỖI',
  MENTIONS_MUST_BE_AN_ARRAY_OF_USER_ID: 'ĐỀ CẬP PHẢI LÀ MỘT MẢNG ID NGƯỜI DÙNG',
  MEDIAS_MUST_BE_AN_ARRAY_OF_MEDIA_OBJECTS: 'PHƯƠNG TIỆN PHẢI LÀ MỘT MẢNG CÁC ĐỐI TƯỢNG PHƯƠNG TIỆN',
  INVALID_TWEET_ID: 'TWEET_ID KHÔNG HỢP LỆ',
  TWEET_NOT_FOUND: 'TWEET KHÔNG TÌM THẤY',
  TWEET_IS_NOT_PUBLIC: 'TWEET KHÔNG CÔNG KHAI',
  MENTIONS_MUST_BE_AN_ARRAY: 'MENTIONS_MUST_BE_AN_ARRAY'
} as const

export const BOOKMARK_MESSAGES = {
  BOOKMARK_SUCCESSFULLY: 'Bookmark thành công',
  UNBOOKMARK_SUCCESSFULLY: 'Unbookmark thành công'
}

export const LIKES_MESSAGES = {
  LIKES_SUCCESSFULLY: 'Likes thành công',
  UNLIKES_SUCCESSFULLY: 'Unlikes thành công'
}
