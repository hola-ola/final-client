import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiCheck, BiSquare, BiCheckSquare } from "react-icons/bi";
import "./Dropdown.css";

function Dropdown({ title, items, multiSelect = true }) {
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
      setSelection([...selectionAfterRemoval]);
    }
  }

  function isItemInSelection(item) {
    if (selection.some((current) => current === item)) {
      return true;
    }
    return false;
  }

  console.log(selection);

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
            <li key={index} className="dd-item">
              {isItemInSelection(item) ? <BiCheckSquare /> : <BiSquare />}

              <button type="button" onClick={() => handleOnClick(item)}>
                <span className="dd-item-text">{item}</span>
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
