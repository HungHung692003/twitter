import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'
import  MediaPlayer,{ MediaOutlet, MediaPoster, MediaCommunitySkin } from '@vidstack/react';

console.log(import.meta.env)

const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env;
  const url = 'https://accounts.google.com/o/oauth2/v2/auth';
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    prompt: 'consent',
  };
  const queryString = new URLSearchParams(query).toString();
  return `${url}?${queryString}`;
};


const googleAuthUrl = getGoogleAuthUrl()

export default function Home() {
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

      <video controls width={500}>
        <source

          src='http://localhost:4000/static/video-stream/c62ee3cbe9da6c3f7f7c15500.mp4'
          type='video/mp4'
        />
      </video>

      <h2>HLS Streaming</h2>
<MediaPlayer
title='Sprite Fight'
src='https://stream.mux.com/VZtzUzGRv020hRnZCxcNg490ilvolTqdnFLEqBsTwaxU.m3u8'
poster='https://image.mux.com/VZtzUzGRv020hRnZCxcNg490ilvolTqdnFLEqBsTwaxU/
thumbnail.webp?time=268&width=980'
thumbnails='https://media-files.vidstack.io/sprite-fight/thumbnails.vtt'
aspectRatio={16 / 9}
crossonigin=''

>

<MediaOutlet>

<MediaPoster alt='Girl walks into sprite gnomes around her friend on a
campfire in danger!' />
<track

src='https://media-files.vidstack.io/sprite-fight/subs/english.vtt'
label='English'
srcLang='en-US'
kind='subtitles'

default
/>
<track
src='https://media-files.vidstack.io/sprite-fight/chapters.vtt'
srcLang='en-US'
kind='chapters'
default
/>
</MediaOutlet>
<MediaCommunitySkin/>
</MediaPlayer>

      <h1>Google OAuth 2.0</h1>
      <p className="read-the-docs">
        <Link to={googleAuthUrl}>Login With Google</Link>
      </p>
    </>
  )
}

export default function Home() {
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
          src="http://localhost:4000/static/video-stream/c62ee3cbe9da6c3f7f7c15500.mp4"
          type="video/mp4"
        />
      </video>

      <h2>HLS Streaming</h2>
      <MediaPlayer
        title="Sprite Fight"
        src="https://stream.mux.com/VZtzUzGRv020hRnZCxcNg490ilvolTqdnFLEqBsTwaxU.m3u8"
        // poster="https://image.mux.com/VZtzUzGRv020hRnZCxcNg490ilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980"
        // thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
         aspectRatio={16 / 9}
        crossorigin=""
      >
        <MediaOutlet>
          <MediaPoster alt="Girl walks into sprite gnomes around her friend on a campfire in danger!" />
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

      <h1>Google OAuth 2.0</h1>
      <p className="read-the-docs">
        <Link to={googleAuthUrl}>Login With Google</Link>
      </p>
    </>
  );
}