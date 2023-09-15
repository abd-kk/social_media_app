import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faMessage,
  faBars,
  faArrowRightFromBracket,
  faMoon,
  faGear,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Auth } from "../AuthenticationContext";
import { useContext, useState, createRef, useEffect } from "react";
import { DocSearch } from "../Document Search/DocSearch";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [showDocSearch, setShowDocSearch] = useState(false);
  const [showDropDownList, setshowDropDownList] = useState(false);
  const { user, getUserInfo, logout } = useContext(Auth);

  const userId = user.userId;

  const userInfo = getUserInfo(userId);

  const location = useLocation();
  const profileCircle = createRef();
  const dropDownList = createRef();
  const mainList = createRef();
  const displayList = createRef();

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("profile-pic")) return;
      if (!showDropDownList) return;
      if (!dropDownList.current.contains(e.target)) {
        console.log("Mo wai moo");
        setshowDropDownList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownList, showDropDownList]);

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

  const toggleDropDownList = (e) => {
    if (dropDownList.current !== null)
      if (dropDownList.current.contains(e.target)) return;
    setshowDropDownList(!showDropDownList);
  };

  const showDisplayList = () => {
    if (mainList.current !== null) mainList.current.classList.remove("active");
    if (displayList.current !== null)
      displayList.current.classList.add("active");
  };

  const hideDisplayList = () => {
    if (mainList.current !== null) mainList.current.classList.add("active");
    if (displayList.current !== null)
      displayList.current.classList.remove("active");
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
            className="profile-circle"
            onClick={toggleDropDownList}
          >
            <img className="profile-pic" src={userInfo.profile} />
            {showDropDownList && (
              <div className="drop-down-list" ref={dropDownList}>
                <ul ref={mainList} className="main-list active">
                  <div className="profile-info" onClick={handleProfileClick}>
                    <div
                      className="profile-circle"
                      style={{ marginRight: "10px" }}
                    >
                      <img src={userInfo.profile} />
                    </div>
                    <div className="user-name">
                      {userInfo.firstName} {userInfo.lastName}
                    </div>
                  </div>

                  <li>
                    <div>
                      <FontAwesomeIcon className="icon" icon={faGear} />
                      <span>Settings</span>
                    </div>

                    <FontAwesomeIcon icon={faArrowRight} />
                  </li>
                  <li onClick={showDisplayList}>
                    <div>
                      <FontAwesomeIcon className="icon" icon={faMoon} />
                      <span>Display</span>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </li>
                  <li onClick={logout}>
                    <div>
                      <FontAwesomeIcon
                        className="icon"
                        icon={faArrowRightFromBracket}
                      />
                      <span>Log Out</span>
                    </div>
                  </li>
                </ul>
                <ul ref={displayList} className="display-list">
                  <div className="list-header">
                    <FontAwesomeIcon
                      className="backIcon"
                      onClick={hideDisplayList}
                      icon={faArrowLeft}
                    />
                    <div className="list-title">Display</div>
                  </div>
                  <div className="list-content">
                    <div className="display-option">
                      <FontAwesomeIcon icon={faMoon} />
                      <div className="display-option-content">
                        <div>Dark Mode</div>
                        <div>Make your eyes comfortable</div>
                      </div>
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div>
                          <label htmlFor="">Off</label>

                          <input type="radio" name="darkMode" />
                        </div>
                        <div>
                          <label htmlFor="">Off</label>

                          <input type="radio" name="darkmode" />
                        </div>
                      </form>
                    </div>
                  </div>
                </ul>
              </div>
            )}
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
