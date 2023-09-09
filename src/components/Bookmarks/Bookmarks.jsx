import "./bookmarks.css";

import { useContext } from "react";
import { Auth } from "../AuthenticationContext";
import { WebsiteLinks } from "../Websitelinks/WebsiteLinks";
import { NavBar } from "../Nav bar/NavBar";
import { useNavigate } from "react-router";

export const Bookmarks = () => {
  const { user, getUserInfo } = useContext(Auth);
  const userId = user.userId;
  const userInfo = getUserInfo(userId);

  let name = `${userInfo.firstName} ${userInfo.lastName}`;

  const navigate = useNavigate();

  return (
    <div className="bookmarks">
      <div
        onClick={() => navigate("/profile", { state: { userId: userId } })}
        className="profile"
      >
        <div className="profile-circle">
          <img src={userInfo.profile} />
        </div>
        <div className="user-name">{name}</div>
      </div>
      <NavBar />
      <WebsiteLinks />
    </div>
  );
};
