/* eslint-disable react/prop-types */
import "./addPost.css";
import { useNavigate } from "react-router";
import { useContext, useState, createRef } from "react";
import { Auth } from "../AuthenticationContext";
import { users } from "../../../public/json files/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faTag,
  faLocationDot,
  faFaceSmile,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export const AddPost = ({ addPost }) => {
  //   const { isLoaded } = useLoadScript({
  //     googleMapsApiKey: "AIzaSyAuPIP0hIg4bpEW9XsL9CigpdGQBk2JjSA",
  //   });

  const [image, setImage] = useState(null);

  const { user, getUserInfo } = useContext(Auth);
  const userId = user.userId;

  const userInfo = getUserInfo(userId);

  const inputRef = createRef();
  const shareButtonRef = createRef();
  const captionRef = createRef();
  const imgRef = createRef();

  const navigate = useNavigate();

  // This is a function that reset the options to set the new active option

  const resetActive = () => {
    const shareOptions = document.querySelectorAll(".share-option");
    shareOptions.forEach((o) => o.classList.remove("active"));
    document.querySelector(".drag-element").style.display = "none";
  };

  // This is a function that reset the add post element

  const resetAddPost = () => {
    captionRef.current.value = "";
    document.querySelector(".add-post .drag-element").style.display = "none";
    const droppedImage = document.querySelector(".dropped-image");
    if (droppedImage !== null) droppedImage.src = null;
    document.querySelector(".imageOrVideo-share").classList.remove("active");
    setImage(null);
  };

  const handleClickImageOption = (e) => {
    resetActive();
    e.target.classList.add("active");
    document.querySelector(".drag-element").style.display = "flex";
  };

  const handleClickTagOption = (e) => {
    resetActive();
    e.target.classList.add("active");
  };
  const handleClickLocationOption = (e) => {
    resetActive();
    e.target.classList.add("active");
  };
  const handleClickFeelingsOption = (e) => {
    resetActive();
    e.target.classList.add("active");
  };

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(selectedImage);
    } else console.log("Only image files are allowed.");
  };

  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles.length === 0) {
      return;
    }

    const droppedImage = droppedFiles[0];

    // Check if the dropped file is an image
    if (droppedImage.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result); // Update the image state with the data URL
      };
      reader.readAsDataURL(droppedImage);
    } else {
      console.log("Only image files are allowed.");
    }
  };

  const RemoveDragE = (e) => {
    e.stopPropagation();
    e.target.parentNode.style.display = "none";
    const droppedImage = document.querySelector(".dropped-image");
    if (droppedImage !== null) droppedImage.src = null;
    document.querySelector(".imageOrVideo-share").classList.remove("active");
    setImage(null);
  };

  const uploadFile = () => {
    inputRef.current.click();
  };

  const sharePost = () => {
    if (captionRef.current.value === "" && imgRef.current === null) {
      console.log("you should enter a caption or an image");
      return;
    }
    let postInfo;
    users.forEach((u) => {
      if (u.userId === userId) {
        postInfo = {
          userId: userId,
          userInfo: u.userInfo,
          post: {
            postId: u.posts.length + 1,
            imageURL: image,
            caption: captionRef.current.value,
            time: "just now",
            reaction: {
              likes: 0,
              love: 0,
            },
            comments: {},
          },
        };
      }
    });

    addPost(postInfo);
    resetAddPost();
  };

  return (
    <div className="add-post">
      <div className="post-info">
        <form>
          <div
            className="profile-circle"
            onClick={() => navigate("/profile", { state: { userId: userId } })}
          >
            <img src={userInfo.profile} alt="" />
          </div>
          <textarea
            ref={captionRef}
            className="post-caption"
            rows={1}
            onChange={(e) => {
              e.target.rows = 1;
              e.target.rows = Math.min(10, e.target.scrollHeight / 20);
            }}
            placeholder={`What's in your mind ${userInfo.firstName}?`}
          ></textarea>
        </form>
        <hr />
        <div
          className="drag-element"
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={uploadFile}
        >
          <span onClick={RemoveDragE} className="remove-drag-element">
            <FontAwesomeIcon
              className="icon"
              icon={faXmark}
              style={{ color: "#183153" }}
            />
          </span>
          {!image ? (
            <div>Drag an image or click to upload one!</div>
          ) : (
            <img ref={imgRef} src={image} className="dropped-image" />
          )}
          <input
            type="file"
            ref={inputRef}
            style={{ visibility: "hidden", position: "absolute" }}
            onChange={handleFileChange}
          ></input>
        </div>

        <div className="share">
          <div className="share-options">
            <div
              className="share-option imageOrVideo-share"
              onMouseEnter={(e) => e.target.classList.add("hovered")}
              onMouseLeave={(e) => e.target.classList.remove("hovered")}
              onClick={handleClickImageOption}
            >
              <FontAwesomeIcon
                className="share-photo-icon icon"
                icon={faImage}
              />
              <span className="share-option-name">Photo</span>
            </div>
            <div
              className="share-option"
              onMouseEnter={(e) => e.target.classList.add("hovered")}
              onMouseLeave={(e) => e.target.classList.remove("hovered")}
              onClick={handleClickTagOption}
            >
              <FontAwesomeIcon className="tag-icon icon" icon={faTag} />
              <span className="share-option-name">Tag</span>
            </div>
            <div
              className="share-option"
              onMouseEnter={(e) => e.target.classList.add("hovered")}
              onMouseLeave={(e) => e.target.classList.remove("hovered")}
              onClick={handleClickLocationOption}
            >
              <FontAwesomeIcon
                className="share-location-icon icon"
                icon={faLocationDot}
              />
              <span className="share-option-name">Location</span>
            </div>
            <div
              className="share-option"
              onMouseEnter={(e) => e.target.classList.add("hovered")}
              onMouseLeave={(e) => e.target.classList.remove("hovered")}
              onClick={handleClickFeelingsOption}
            >
              <FontAwesomeIcon className="smile-icon icon" icon={faFaceSmile} />
              <span className="share-option-name">Feelings</span>
            </div>
          </div>
          <button
            onClick={sharePost}
            ref={shareButtonRef}
            className="share-button"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
