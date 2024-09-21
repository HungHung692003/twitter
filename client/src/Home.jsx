import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
//import { Link } from 'react-router-dom';
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';

// Hàm để tạo URL đăng nhập Google OAuth 2.0
const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env;
  const url = 'https://accounts.google.com/o/oauth2/v2/auth';
  const queryParams = new URLSearchParams({
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    prompt: 'consent',
  }).toString();
  return `${url}?${queryParams}`;
};

const googleAuthUrl = getGoogleAuthUrl();

export default function Home() {
  const storedProfile = localStorage.getItem('profile');
  const profile = storedProfile ? JSON.parse(storedProfile) : {};

  return (
    <>
      <div>
        <span>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </span>
        <span>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </span>
      </div>

      <h2>Video Streaming</h2>
      <video controls width={500}>
        <source
          src="http://localhost:3000/static/video/qzWSyBZ8lqgzT7mI0yGFk.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Uncomment this block if you want to support HLS streaming */}
      {/* 
      <h2>Video HLS Streaming</h2>
      <MediaPlayer
        title="Sprite Fight"
        src="http://localhost:3000/static/video/zQg2-2YgxSc41tVNzEsxK/master.m3u8"
        aspectRatio={16 / 9}
        crossorigin=""
      >
        <MediaOutlet>
          <MediaPoster alt="Sprite Fight Scene" />
          <track
            src="https://media-files.vidstack.io/sprite-fight/subs/english.vtt"
            label="English"
            srcLang="en-US"
            kind="subtitles"
            default
          />
          <track
            src="https://media-files.vidstack.io/sprite-fight/chapters.vtt"
            srcLang="en-US"
            kind="chapters"
            default
          />
        </MediaOutlet>
        <MediaCommunitySkin />
      </MediaPlayer> 
      */}

      <h1>Google OAuth 2.0</h1>
      {profile.email ? (
        <p className="read-the-docs">
          Logged in as: <strong>{profile.email}</strong>
        </p>
      ) : (
        <p className="read-the-docs">
          <a href={googleAuthUrl}>
            <button>Login with Google</button>
          </a>
        </p>
      )}
    </>
  )
}
