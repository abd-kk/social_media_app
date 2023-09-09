import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faMessage,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Auth } from "../AuthenticationContext";
import { useContext, useState, createRef } from "react";
import { DocSearch } from "../Document Search/DocSearch";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [showDocSearch, setShowDocSearch] = useState(false);
  const { user, getUserInfo } = useContext(Auth);

  const userId = user.userId;

  const userInfo = getUserInfo(userId);

  const location = useLocation();
  const profileCircle = createRef();

  const navigate = useNavigate();

  const showDocumentSearch = () => {
    setShowDocSearch(true);
  };

  const hideDocumentSearch = () => {
    setShowDocSearch(false);
  };

  const handleProfileClick = () => {
    if (location.pathname === "/profile") return;
    navigate("/profile", { state: { userId: userId } });
  };

  return (
    <div className="nav-bar">
      <div className="logo-holder">
        <Link to="/">Kenpatchisocial</Link>
      </div>
      <div className="search-bar-holder">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          type="text"
          onFocus={showDocumentSearch}
          placeholder="Search for friend, post or video"
        />
      </div>
      <div className="links-holder">
        <div className="links">
          <Link to="/">Homepage</Link>
          <Link to="/">Timeline</Link>
        </div>
        <div className="icons-holder">
          <div className="expand-sidebar-icon">
            <Link to="/bookmarks">
              <FontAwesomeIcon className="icon" icon={faBars} />
            </Link>
          </div>
          <FontAwesomeIcon
            onClick={showDocumentSearch}
            className="icon search-icon"
            icon={faMagnifyingGlass}
          />

          <FontAwesomeIcon className="icon" icon={faMessage} />
          <FontAwesomeIcon className="icon" icon={faBell} />
        </div>
        <div className="profile">
          <div
            ref={profileCircle}
            onClick={handleProfileClick}
            className="profile-circle"
          >
            <img src={userInfo.profile} alt="" />
          </div>
        </div>
      </div>
      {showDocSearch &&
        createPortal(
          <DocSearch onClose={hideDocumentSearch}></DocSearch>,
          document.body
        )}
    </div>
  );
};
