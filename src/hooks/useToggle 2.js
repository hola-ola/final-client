import React from "react";

export default function useTogle(initialValue) {
  const [toggle, setToggle] = React.useState(initialValue);

  function toggleValue() {
    setToggle(!toggle);
  }
  return [toggle, toggleValue];
}
