/* eslint-disable react/prop-types */
import { users } from "../../../public/json files/users";
import "./comments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faFaceSmile,
  faLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, createRef, useContext, useState } from "react";
import { Auth } from "../AuthenticationContext";
import { useNavigate } from "react-router";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

export const Comments = ({ allComments, onClose }) => {
  const listComments = () => {
    // This is an array that holds the comment elements of the commenters
    let array = [],
      commenterId = [];
    const keys = Object.keys(allComments);

    keys.forEach((c) => {
      commenterId.push(Number(c.split("userId").join("")));
    });

    users.forEach((u, i) => {
      if (commenterId.indexOf(u.userId) !== -1) {
        const c = Object.values(allComments)[commenterId.indexOf(u.userId)];
        array.push(
          <Comment
            key={i}
            userId={u.userId}
            userProfile={u.userInfo.profile}
            userName={`${u.userInfo.firstName} ${u.userInfo.lastName}`}
            userComment={c}
          />
        );
      }
    });
    return array;
  };

  const commentsContainerRef = createRef();
  const commentInput = createRef();
  const commentsList = createRef();
  const emojiPicker = createRef();

  const { user, getUserInfo } = useContext(Auth);
  const { userId } = user;

  const [comments, setComments] = useState(listComments());

  const [isPickerVisible, setPickerVisible] = useState(false);

  const addComment = () => {
    let c = commentInput.current.value;
    if (c === "") return;

    const userInfo = getUserInfo(userId);

    let fullName = `${userInfo.firstName} ${userInfo.lastName}`;

    const newComment = (
      <Comment
        key={comments.length + 1}
        userId={userId}
        userName={fullName}
        userProfile={userInfo.profile}
        userComment={c}
      />
    );

    setComments((prevComments) => [...prevComments, newComment]);
    commentInput.current.value = "";
  };

  useEffect(() => {
    const focusAtEnd = () => {
      const inputElement = commentInput.current;
      if (inputElement) {
        const inputValue = inputElement.value;
        inputElement.focus();
        inputElement.setSelectionRange(inputValue.length, inputValue.length);
      }
    };
    focusAtEnd();
    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("mousedown", handleClickOutsideEmojiPicker, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener(
        "mousedown",
        handleClickOutsideEmojiPicker,
        true
      );
    };
  });

  useEffect(() => {
    // Disable scrolling when the comment component is opened
    document.body.classList.add("disable-scrolling");

    // Cleanup: Re-enable scrolling when the comment component is closed
    return () => {
      document.body.classList.remove("disable-scrolling");
    };
  }, [commentInput]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addComment();
  };

  const handleClickOutside = (e) => {
    if (!commentsContainerRef.current.contains(e.target)) onClose();
  };

  const handleClickOutsideEmojiPicker = (e) => {
    if (isPickerVisible) {
      if (!emojiPicker.current.contains(e.target)) setPickerVisible(false);
    }
  };

  return (
    <div className="comments">
      <div ref={commentsContainerRef} className="comments-container">
        <div className="all-comments">
          <div onClick={onClose} className="close-comments">
            <FontAwesomeIcon className="icon" icon={faX} />
          </div>
          <ul ref={commentsList} className="comments-list">
            {comments.map((c) => c)}
          </ul>
        </div>
        <div className="comment-form">
          <input
            onKeyDown={handleKeyPress}
            ref={commentInput}
            type="text"
            placeholder="Enter a comment !"
          />
          <div className="comment-options">
            <div className="options">
              <FontAwesomeIcon
                onClick={() => setPickerVisible(!isPickerVisible)}
                className="emoji-icon icon"
                icon={faFaceSmile}
              />
            </div>
            <div className="comment-icon-holder">
              <FontAwesomeIcon
                onClick={addComment}
                className="comment-icon icon"
                icon={faLeftLong}
              />
            </div>

            <div
              className={
                isPickerVisible ? "show-picker picker" : "hide-picker picker"
              }
              ref={emojiPicker}
            >
              <Picker
                data={data}
                previewPosition="none"
                onEmojiSelect={(e) => {
                  commentInput.current.value += e.native;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const Comment = ({ userId, userProfile, userName, userComment }) => {
  const { user } = useContext(Auth);
  const removeComment = createRef();

  const navigate = useNavigate();

  const removeMyComment = () => {
    removeComment.current.parentNode.remove();
  };

  return (
    <li className="comment">
      <div
        onClick={() => navigate("/profile", { state: { userId: userId } })}
        className="profile-circle"
      >
        <img src={userProfile} />
      </div>
      <div className="comment-content">
        <h3
          onClick={() => navigate("/profile", { state: { userId: userId } })}
          className="commenter-name"
        >
          {userName}
        </h3>
        <div className="the-comment">{userComment}</div>
      </div>
      <div
        ref={removeComment}
        onClick={removeMyComment}
        className={
          user.userId === userId ? "show-remove-comment" : "hide-remove-comment"
        }
      >
        <FontAwesomeIcon className="icon" icon={faX} />
      </div>
    </li>
  );
};
