/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { NavBar } from "../../components/Nav bar/NavBar";
import "./friends.css";
import { users } from "../../../public/json files/users";
import { Auth } from "../../components/AuthenticationContext";
import { useContext } from "react";

const Friends = () => {
  const [friends, setfriends] = useState([]);

  const { state } = useLocation();

  const { getUserInfo } = useContext(Auth);

  useEffect(() => {
    const getFriendsId = () => {
      return getUserInfo(state.userId).friendWith;
    };

    let friendsId = getFriendsId();

    let friends = [];

    users.forEach((u) => {
      if (friendsId.includes(u.userId)) {
        friends.push({ userId: u.userId, userInfo: u.userInfo });
      }
    });

    setfriends(friends);
  }, [state.userId, getUserInfo]);

  return (
    <div className="friends">
      <NavBar />
      <h2>Friends</h2>
      <div className="friends-container">
        {friends.length > 0 &&
          friends.map((f, i) => (
            <FriendBox key={i} friendId={f.userId} friendInfo={f.userInfo} />
          ))}
      </div>
    </div>
  );
};

export default Friends;

const FriendBox = ({ friendId, friendInfo }) => {
  const navigate = useNavigate();

  const { user, getUserInfo } = useContext(Auth);
  const { userId } = user;

  let userInfo,
    mutualFriends = 0;

  userInfo = getUserInfo(userId);

  friendInfo.friendWith.forEach((f) => {
    if (userInfo.friendWith.includes(f)) mutualFriends++;
  });

  const name = `${friendInfo.firstName} ${friendInfo.lastName}`;
  return (
    <div className="friend-box">
      <div
        onClick={() => navigate("/profile", { state: { userId: friendId } })}
        className="profile-pic-container"
      >
        <img src={friendInfo.profile} />
      </div>
      <div className="friend-info">
        <div
          onClick={() => navigate("/profile", { state: { userId: friendId } })}
          className="friend-name"
        >
          {name}
        </div>
        <div className="mutual-friends">{mutualFriends} mutual friends</div>
      </div>
    </div>
  );
};
