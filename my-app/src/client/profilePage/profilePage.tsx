import React from 'react';

import styles from './ProfilePage.module.css';

const ProfilePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.avatar}>
          <img
            src="https://avatars1.githubusercontent.com/u/53025782?s=400&u=f1ffa8eaccb8545222b7c642532161f11e74a03d&v=4"
            alt="Elton Lazzarin"
          />
        </div>
      </div>

      <div className={styles.profileData}>
        <button className={styles.editButton}>Set up profile</button>

        <h1>Elton Lazzarin</h1>
        <h2>@elton_lazzarin</h2>

        <p>
          Developer at{' '}
          <a href="https://www.linkedin.com/in/eltonlazzarin/" target="_blank" rel="noopener noreferrer">
            @WordlLab
          </a>
        </p>

        <ul>
          <li>
            <span className={styles.locationIcon}>📍</span> São José do Rio Preto, Brazil
          </li>
          <li>
            <span className={styles.cakeIcon}>🎂</span> Born on May 13, 1989
          </li>
        </ul>

        <div className={styles.followage}>
          <span>
            <strong>98 </strong>
            Following
          </span>
          <span>
            <strong>322 </strong>Followers
          </span>
        </div>
      </div>

    
    </div>
  );
};

export default ProfilePage;
