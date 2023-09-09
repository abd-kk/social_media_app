/* eslint-disable react/prop-types */
import { users } from "../../../public/json files/users";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const RightSide = ({ userId, userInfo, userFriends }) => {
  const [friends, setfriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let friends = [];

    users.forEach((u) => {
      if (userFriends !== undefined) {
        if (userFriends.includes(u.userId) && friends.length <= 5) {
          friends.push({ userId: u.userId, userInfo: u.userInfo });
        }
      }
    });

    setfriends(friends);
  }, [userFriends]);

  const getNbUserFriends = () => {
    if (userFriends !== undefined) return userFriends.length;
    return 0;
  };

  return (
    <div className="right-side">
      <h2>User Information</h2>
      <div className="user-info">
        <div className="user-city">
          <span>City: </span> <span> {userInfo.city}</span>
        </div>
        <div className="user-from">
          <span>From: </span> <span>{userInfo.from}</span>
        </div>
        <div className="user-relationship">
          <span>Relationship: </span> <span>{userInfo.relationship}</span>
        </div>
      </div>
      <hr />
      <div className="friends-header">
        <h2
          onClick={() =>
            navigate("/profile/friends", { state: { userId: userId } })
          }
          style={{ cursor: "pointer", marginTop: "10px" }}
        >
          User Friends
        </h2>
        {getNbUserFriends() > 6 && (
          <button
            onClick={() => navigate("friends", { state: { userId: userId } })}
            className="seemore-friends"
          >
            See more
          </button>
        )}
      </div>
      <div className="nb-of-friends">{getNbUserFriends()} friends</div>
      <div className="friends-boxes">
        {friends.length > 0 &&
          friends.map((f, i) => <FriendBox key={i} friend={f} />)}
      </div>
    </div>
  );
};

const FriendBox = ({ friend }) => {
  const navigate = useNavigate();

  const { userId, userInfo } = friend;
  return (
    <div
      onClick={() => navigate("/profile", { state: { userId: userId } })}
      className="friend-box"
    >
      <div className="profile-pic-holder">
        <img src={userInfo.profile} />
      </div>
      <div className="friend-name">
        {userInfo.firstName} {userInfo.lastName}
      </div>
    </div>
  );
};
