/* eslint-disable react/prop-types */
import "./rightSideBar.css";
import { Auth } from "../AuthenticationContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { users } from "../../../public/json files/users";

export const RightSideBar = () => {
  const { user, getUserInfo } = useContext(Auth);
  const { userId } = user;
  const userInfo = getUserInfo(userId);

  const [friends, setfriends] = useState([]);

  useEffect(() => {
    const friendsId = userInfo.friendWith;
    let friends = [];

    users.forEach((u) => {
      if (friendsId.includes(u.userId)) {
        friends.push({
          userId: u.userId,
          userInfo: u.userInfo,
        });
      }
    });

    setfriends(friends);
  }, [user.userId, userInfo.friendWith]);

  return (
    <div className="right-side-bar">
      <div className="birthday-section">
        <div className="image-holder">
          <img src="../../../public/images/gift.png" alt="" />
        </div>

        <div>
          <b>Ammar malas</b> and <b>3 other friends </b> have a birthday today
        </div>
      </div>
      <div className="online-friends-section">
        <h3 style={{ marginBottom: "10px" }}>Online Friends</h3>
        <ul>
          {friends.map((f, i) => {
            return (
              <OnlineFriend key={i} userId={f.userId} userInfo={f.userInfo} />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const OnlineFriend = ({ userId, userInfo }) => {
  const name = `${userInfo.firstName} ${userInfo.lastName}`;
  const navigate = useNavigate();
  return (
    <li
      onClick={() => navigate("/profile", { state: { userId: userId } })}
      className="online-friend"
    >
      <div className="image-holder">
        <img src={userInfo.profile} />
      </div>
      <div className="user-name">{name}</div>
    </li>
  );
};
