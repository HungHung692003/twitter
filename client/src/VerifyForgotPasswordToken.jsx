import { useEffect, useState } from 'react'
import useQueryParams from './useQueryParams';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function VerifyForgotPasswordToken() {
  const [message, setMessage] = useState('')
  const { token } = useQueryParams()
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController();

    if (token) {
      axios.post('/api/verify-forgot-password',// URL xác thực token forgot password  bên API Server của bạn
        { forgot_password_token: token },
        {
          baseURL: import.meta.env.VITE_API_URL,
          signal: controller.signal
        }
      )
        .then(() => {
          // Bên cái trang ResetPassword của chúng ta nó cần cái forgot_password_token để gửi lên API
          // Ở đây chúng ta có 2 cách để cái trang ResetPassword nó nhận cái forgot_password_token nay
          // Cách 1: Tại đây chúng ta lưu cái forgot_password_token nay vao localStorage
          // Và bên trang ResetPassword này chỉ cần get ra mà dùng là được

          // Cách 2: Chung ta dung state cua React Router de truyen cai forgot_password_token nay qua trang ResetPassword 
          navigate('/reset-password', {
            state: { forgot_password_token: token }
          })
        })
        .catch((err) => {
          setMessage(err.response.data.message)
        })
    }

    return () => {
      controller.abort()
    }

  }, [token, navigate])
  return <div>{message}</div>
}