import "./websitelinks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRss,
  faMessage,
  faVideo,
  faUserGroup,
  faBookmark,
  faCircleQuestion,
  faBriefcase,
  faCalendarWeek,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export const WebsiteLinks = () => {
  const navigate = useNavigate();
  return (
    <ul className="list website-links">
      <li>
        <FontAwesomeIcon icon={faRss} /> <span>Feed</span>
      </li>
      <li>
        <FontAwesomeIcon icon={faMessage} /> <span>Chats</span>
      </li>
      <li>
        <FontAwesomeIcon icon={faVideo} /> <span>Videos</span>
      </li>
      <li>
        <FontAwesomeIcon icon={faUserGroup} /> <span>Groups</span>
      </li>
      <li onClick={() => navigate("saved")}>
        <FontAwesomeIcon icon={faBookmark} /> <span>Saved</span>
      </li>
      <li>
        <FontAwesomeIcon icon={faCircleQuestion} /> <span>Questions</span>
      </li>
      <li>
        <FontAwesomeIcon icon={faBriefcase} /> <span>Jobs</span>
      </li>
      <li>
        <FontAwesomeIcon icon={faCalendarWeek} /> <span>Events</span>
      </li>
      <li>
        <FontAwesomeIcon icon={faGraduationCap} /> <span>Courses</span>
      </li>
      <button className="show-more-button">Show more</button>
    </ul>
  );
};
