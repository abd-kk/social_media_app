import "./sideBar.css";
import { useContext } from "react";
import { Auth } from "../AuthenticationContext";
import { users } from "../../../public/json files/users";
import { WebsiteLinks } from "../Websitelinks/WebsiteLinks";
import { useNavigate } from "react-router";

export const SideBar = () => {
  const { user, getUserInfo } = useContext(Auth);
  const { userId } = user;

  const navigate = useNavigate();

  const getOnlineFriendsId = () => {
    const userInfo = getUserInfo(userId);
    return userInfo.friendWith;
  };

  const onlineFriendsList = () => {
    const onlineFriendsId = getOnlineFriendsId();

    // This is the array that contains the online friends item which is an <li></li>
    let array = [];
    users.forEach((u, i) => {
      if (onlineFriendsId.indexOf(u.userId) !== -1) {
        let element = (
          <li
            onClick={() =>
              navigate("/profile", { state: { userId: u.userId } })
            }
            className="online-friend"
            key={i}
          >
            <div className="profile-circle">
              <img src={u.userInfo.profile} />
            </div>
            <span className="online-friend-name">
              {u.userInfo.firstName} {u.userInfo.lastName}
            </span>
          </li>
        );
        array.push(element);
      }
    });
    return <>{array.map((e) => e)}</>;
  };

  return (
    <div className="side-bar">
      <div className="side-bar-container">
        <WebsiteLinks></WebsiteLinks>
        <hr />
        <ul className="online-friends-list">
          {onlineFriendsList()} {onlineFriendsList()} {onlineFriendsList()}
        </ul>
      </div>
    </div>
  );
};
