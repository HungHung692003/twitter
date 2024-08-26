import React, { useState } from "react";
import styles from "./Login.module.scss";
import google from './icon/google.png';
import apple from './icon/apple.png';
import twitter from './img/twitter.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import btn from './button.module.scss';
import Register from "../register/register";

interface LoginFormInputs {
    email: string;
    password: string;
}

export default function LoginComponent() {
    const [step, setStep] = useState(1);
    const [showCreate, setShowCreate] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [showRegister, setShowRegister] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);  // State to handle loading

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    const handleNext = () => {
        if (step === 1) {
            // Save email and move to step 2
            setEmail('');
            setStep(2);
        }
    };

    const handleLoginClose = () => {
        setShowCreate(false);
        setStep(1);
    };

    const handleRegisterClick = () => {
        setShowRegister(true);
    };
    const onSubmit = async (data: LoginFormInputs) => {
      setLoading(true);
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post('http://localhost:3000/api/login', data);
        
          toast.success('Đăng nhập thành công!');
          // Navigate('/home'); chuyển hướng sang trang chính home
          // Xử lý thêm sau khi đăng nhập thành công
          // Ví dụ: lưu token vào localStorage, chuyển hướng trang, v.v.
      } catch (error) {
          if (axios.isAxiosError(error)) {
              // Kiểm tra nếu có phản hồi từ máy chủ
              if (error.response) {
                  const responseData = error.response.data;
                  const status = error.response.status;
                  
                  // Xử lý thông báo lỗi chung
                  const errorMessage = responseData.message || 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.';
                  toast.error(errorMessage);
  
                  // Xử lý lỗi chi tiết từ phản hồi (nếu có)
                  if (responseData.errors) {
                      for (const field in responseData.errors) {
                          const errorDetail = responseData.errors[field];
                          if (errorDetail.msg) {
                              toast.error(`${field}: ${errorDetail.msg}`);
                          }
                      }
                  }
              } else {
                  // Nếu không có phản hồi từ máy chủ
                  toast.error('Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.');
              }
          } else {
              // Nếu không phải lỗi từ Axios
              toast.error('Đã xảy ra lỗi không xác định.');
          }
          console.error('Lỗi:', error);
      } finally {
          setLoading(false);
      }
  };
  
  

    return (
        <>
            <div className={styles.containertwitter}>
                <div className={styles.login}>
                    <div className={styles.twitterlogin}>
                        <div className={styles.twitterlogin__left}>
                            <img src={twitter} className={styles.twitterlogin__img} alt="" />
                        </div>
                        <div className={styles.twitterlogin__right}>
                            <h1 className={styles.twitterlogin__heading}>Đang diễn ra ngay bây giờ</h1>
                            <p className={styles.twitterlogin__desc}>Tham gia ngay.</p>
                            <div className={styles.twitterlogin__form}>
                                <button className={btn.btn1}>
                                    <img src={google} className={styles.twitterlogin__icon} alt="" />
                                    Đăng ký bằng Gmail
                                </button>
                                <button className={`${btn.btn1} ${btn['btn1-mt5']}`}>
                                    <img src={apple} alt="" className={styles.twitterlogin__icon} />
                                    Đăng ký bằng Apple
                                </button>
                                <div className={styles.twitterlogin__script}>
                                    <span className={styles.twitterlogin__block}></span>
                                    <p>hoặc</p>
                                    <span className={styles.twitterlogin__block}></span>
                                </div>
                                <button className={`${btn.btn2} ${btn['btn2-mt8']}`} onClick={handleRegisterClick}>
                                    Tạo tài khoản
                                </button>
                                <div className={styles.twitterlogin__request}>
                                    <p>Khi đăng ký, bạn đã đồng ý với <span>Điều khoản Dịch vụ</span> và <span>Chính sách Quyền riêng tư</span>, gồm cả <span>Sử dụng Cookie</span>.</p>
                                </div>
                                <div className={styles.twitterlogin__ask}>
                                    Đã có tài khoản?
                                </div>
                                <button className={`${btn.btn3} ${btn['btn3-mt21']}`} onClick={() => setShowCreate(true)}>
                                    Đăng nhập
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showCreate && (
                <div className={`${styles.twittercreate} ${styles.show}`}>
                    <div className={styles.twittercreate__block}>
                        <div className={styles.twittercreate__on}>
                            <a className={styles.twittercreate__close} onClick={handleLoginClose}>X</a> 
                            <img src={twitter} className={styles.twittercreate__icon} alt="" />
                            <span></span>
                        </div>

                        {step === 1 && (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h2 className={styles.twitterlogin__desc}>Đăng nhập vào X</h2>
                                <button className={btn.btn1}>
                                    <img src={google} className={styles.twitterlogin__icon} alt="" />
                                    Đăng ký bằng Gmail
                                </button>
                                <button className={`${btn.btn1} ${btn['btn1-mt30']}`}>
                                    <img src={apple} className={styles.twitterlogin__icon} />
                                    Đăng ký bằng Apple
                                </button>
                                <div className={styles.twitterlogin__script}>
                                    <span className={styles.twitterlogin__block}></span>
                                    <p>hoặc</p>
                                    <span className={styles.twitterlogin__block}></span>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Số điện thoại, email hoặc tên người dùng"
                                        className={styles.twittercreate__textsc}
                                        {...register('email')}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />  
                                </div>
                                <button
                                    type="button"
                                    className={`${btn.btn1} ${btn['btn1-mt30']}`}
                                    onClick={handleNext}
                                >
                                    Tiếp theo
                                </button>
                                <button className={`${btn.btn3} ${btn['btn3-mt26']}`}>
                                    Quên mật khẩu
                                </button>
                                <p className={`${styles.twittercreate__desc} ${styles['twittercreate__desc-mt21']}`}>Không có tài khoản?<a href="#">Đăng ký</a></p>
                            </form>
                        )}
                        {step === 2 && (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles.twitterlogin__input}>
                                    <h2 className={styles.twitterlogin__enter}>Nhập mật khẩu của bạn</h2>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        readOnly
                                        className={styles.twitterlogin__email}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Mật khẩu"
                                        className={styles.twitterlogin__password}
                                        {...register('password')}
                                    />
                                    <a href="#" className={styles.twitterlogin__forgot}>quên mật khẩu</a>
                                    <button
                                        type="submit"
                                        className={`${btn.btn1} ${btn['btn1-mt222']}`}
                                        disabled={loading} // Disable button while loading
                                    >
                                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                                    </button>
                                    <p className={`${styles.twittercreate__desc} ${styles['twittercreate__desc-mt22']}`}>Không có tài khoản?<a href="#">Đăng ký</a></p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {showRegister && (
                <Register showRegister={showRegister} onClose={() => setShowRegister(false)} />
            )}

            <ToastContainer />
        </>
    );
}
