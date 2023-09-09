/* eslint-disable react/prop-types */
import "./post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faThumbsUp,
  faEllipsisVertical,
  faTrash,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { createRef, useState } from "react";
import { createPortal } from "react-dom";
import { Comments } from "../Comments/Comments";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const Post = ({ postInfo, removePost }) => {
  const { userId, userInfo, post } = postInfo;

  const countReactionsElement = createRef();
  const postRef = createRef();
  const moreOptionsRef = createRef();

  const [isLiked, setisLiked] = useState(false);
  const [showMoreOptions, setshowMoreOptions] = useState(false);

  const [showComments, setshowComments] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let closeMoreOptions = (e) => {
      if (
        moreOptionsRef.current &&
        !moreOptionsRef.current.contains(e.target)
      ) {
        setshowMoreOptions(false);
      }
    };

    const closeMO = document.addEventListener("mousedown", closeMoreOptions);

    return () => {
      document.removeEventListener("mousedown", closeMO);
    };
  }, [moreOptionsRef]);

  const countReactions = () => {
    let n = 0;
    const reactions = Object.values(post.reaction);
    reactions.forEach((r) => (n += r));
    return n;
  };

  const handleReactClick = (e) => {
    e.stopPropagation();

    if (!isLiked) {
      countReactionsElement.current.innerHTML =
        parseInt(countReactionsElement.current.innerHTML) + 1;
      setisLiked(true);
    } else {
      countReactionsElement.current.innerHTML =
        parseInt(countReactionsElement.current.innerHTML) - 1;
      setisLiked(false);
    }
  };

  const deletePost = () => {
    removePost(post.postId, userId);
  };

  return (
    <div className="post" ref={postRef}>
      <div className="header">
        <div className="post-info">
          <div
            onClick={() => navigate("/profile", { state: { userId: userId } })}
            className="profile-circle"
          >
            <img src={userInfo.profile} />
          </div>
          <div
            className="poster-name"
            onClick={() => navigate("/profile", { state: { userId: userId } })}
          >
            {userInfo.firstName} {userInfo.lastName}
          </div>
          <div className="post-time">{post.time}</div>
        </div>
        <div
          className="more-options-icon"
          onClick={() => setshowMoreOptions(!showMoreOptions)}
        >
          <FontAwesomeIcon className="icon" icon={faEllipsisVertical} />
          <ul
            ref={moreOptionsRef}
            className={
              showMoreOptions ? "more-options-list" : "more-options-list hide"
            }
          >
            <li onClick={deletePost}>
              <FontAwesomeIcon icon={faTrash} /> <span>Delete Post</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faSave} /> <span>Save Post</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="post-caption">{post.caption}</div>
      {post.imageURL !== null && post.imageURL.length > 0 ? (
        <div className="post-image">
          <img src={post.imageURL} />
        </div>
      ) : null}

      <div className="post-footer">
        <div className="reactions">
          <FontAwesomeIcon
            onClick={handleReactClick}
            className="icon like-icon"
            icon={faThumbsUp}
          />
          <FontAwesomeIcon
            onClick={handleReactClick}
            className="icon care-icon"
            icon={faHeart}
          />
          <div ref={countReactionsElement} className="count-reactions">
            {countReactions()}
          </div>
        </div>
        <div className="post-comments" onClick={() => setshowComments(true)}>
          {Object.keys(post.comments).length} comments
        </div>
      </div>
      {showComments &&
        createPortal(
          <Comments
            allComments={post.comments}
            onClose={() => setshowComments(false)}
          />,
          document.body
        )}
    </div>
  );
};
