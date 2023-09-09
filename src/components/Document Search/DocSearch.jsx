/* eslint-disable react/prop-types */
import "./docSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faStar,
  faClockRotateLeft,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { createRef, useEffect } from "react";

export const DocSearch = (props) => {
  const { onClose } = props;

  const listboxRef = createRef();
  const historySearch = ["Ammar malas", "Adam kalasina", "Majd Ghosh"];

  const containerRef = createRef();

  const removeSearchItem = (e) => {
    e.stopPropagation();
    e.target.parentNode.parentNode.remove();
  };

  useEffect(() => {
    let handler = (e) => {
      if (!containerRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [containerRef, onClose]);

  return (
    <div className="doc-search">
      <div ref={containerRef} className="doc-search-container">
        <div className="doc-search-form">
          <form>
            <label>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </label>
            <input type="text" placeholder="Search docs" />
          </form>
          <button className="close-button" onClick={onClose}>
            Cancel
          </button>
        </div>
        <div className="doc-search-dropdown">
          <div className="recent">Recent</div>
          <ul ref={listboxRef} className="listbox">
            {historySearch.map((h, i) => (
              <ListItem
                key={i}
                searchItem={h}
                removeSearchItem={removeSearchItem}
              ></ListItem>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ListItem = (props) => (
  <li className="doc-search-item">
    <div>
      <FontAwesomeIcon icon={faClockRotateLeft} />
      <span>{props.searchItem}</span>
    </div>
    <div className="icons">
      <FontAwesomeIcon className="icon" icon={faStar} />
      <FontAwesomeIcon
        className="remove-item-button icon"
        onClick={props.removeSearchItem}
        icon={faX}
      />
    </div>
  </li>
);
