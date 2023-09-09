import React from "react";

/* eslint-disable react/prop-types */
const ProfileHeader = ({ userInfo }) => {
  const name = `${userInfo.firstName} ${userInfo.lastName}`;
  return (
    <div className="profile-header">
      <div className="background-holder">
        <img className="background-image" src={userInfo.backgroundImage} />
        <div className="profile-pic">
          <img src={userInfo.profile} />
        </div>
      </div>
      <h2 className="profile-name">{name}</h2>
      <div className="profile-bio">{userInfo.bio}</div>
    </div>
  );
};

export const MemoizedProfileHeader = React.memo(ProfileHeader);
