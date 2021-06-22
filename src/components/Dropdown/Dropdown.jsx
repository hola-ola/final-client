import React, { useState, useEffect } from "react";
import onClickOutside from "react-onclickoutside";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiSquare, BiCheckSquare } from "react-icons/bi";
import "./Dropdown.css";
const defunc = () => {};

function Dropdown({
  title,
  modelKey,
  items,
  multiSelect = true,
  setFilteredResults = defunc,
}) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);

  function handleOnClick(item) {
    if (!selection.some((current) => current === item)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current !== item
      );
      setSelection([selectionAfterRemoval]);
    }
  }

  useEffect(() => {
    setFilteredResults((prev) => ({
      ...prev,
      [modelKey]: selection.flat(Infinity),
    }));
  }, [selection]);

  function isItemInSelection(item) {
    if (selection.some((current) => current === item)) {
      return true;
    }
    return false;
  }

  return (
    <div className="dd-container">
      <div
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-label">
          <p>{title}</p>
          {open ? <IoIosArrowUp size="20px" /> : <IoIosArrowDown size="20px" />}
        </div>
      </div>

      {open && (
        <ul className="dd-list">
          {items.map((item, index) => (
            <li
              key={index}
              className={`dd-item ${
                isItemInSelection(item) ? "yellow" : "none"
              }`}
            >
              {/* {isItemInSelection(item) ? <BiCheckSquare /> : <BiSquare />} */}
              <button type="button" onClick={() => handleOnClick(item)}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
