import React from "react";
import "../../style/Button.css";
import "./HowToCard.css";

export default function HowToCard(props) {
  const { item, key } = props;
  return (
    <div className="how-to-card">
      <h3>{item.title}</h3>
      <div>{item.description}</div>
    </div>
  );
}
