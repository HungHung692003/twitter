import { useLocation } from "react-router-dom"

export default function ResetPassword() {
  const location = useLocation()
  console.log(location.state)
  return (
    <div>
      <h2>Reset Password</h2>
      <form>
        <div>
          <input type='password' placeholder='Mật khẩu mới'/>
        </div>
        <div>
          <input type='password' placeholder='Xác nhận mật khẩu'/>
        </div>
        <button type='submit'>Reset Password</button>
      </form >
    </div >
  )
}