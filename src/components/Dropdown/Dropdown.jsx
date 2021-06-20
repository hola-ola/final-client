import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./Dropdown.css";

export default function Dropdown({ title, items, multiSelect = true }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);

  function handleOnClick(item) {
    if (!selection.some((current) => current === item)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      } else {
        let selectionAfterRemoval = selection;
        selectionAfterRemoval = selectionAfterRemoval.filter(
          (current) => current !== item
        );
        setSelection([...selectionAfterRemoval]);
      }
    }
  }

  function isItemInSelection(item) {
    if (selection.find((current) => current === item)) {
      return true;
    }
    return false;
  }

  return (
    <div className="dropdown-test">
      <div
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div>
          <p>{title}</p>
        </div>
        <div>{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
      </div>
      {open && (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <button type="button" onClick={() => handleOnClick(item)}>
                {item}
                {isItemInSelection(item) && "Selected"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
