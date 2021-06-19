import React, { useEffect, useState } from "react";
import * as MESSAGE_SERVICE from "../../services/message.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

import useForm from "../../hooks/useForm";

export default function NewMessage(props) {
  const [newConversation, setNewConversation] = useState({
    user1: props.user._id,
    user2: "",
    subject: "",
    text: "",
  });

  const [
    form,
    handleChange,
    handleSubmit,
    inputProps,
    images,
    handleImageChange,
  ] = useForm({
    ...newConversation,
  });

  const { user } = props;

  const onSubmit = handleSubmit((formValues) => {
    console.log(formValues);
    // const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    // MESSAGE_SERVICE.NEW_CONVERSATION({ ...formValues }, accessToken)
    //   .then((res) => {
    //     console.log(res);
    //     if (!res) {
    //       return console.log("NO RESPONSE");
    //     }
    //     console.log("This is the res:".res);
    //   })
    //   .catch((err) => {
    //     console.error("This is the error:", err);
    //   });
  });

  return (
    <div>
      <div>
        <h2>Send a message</h2>
        <form onSubmit={onSubmit}>
          <h3>From: {user.username}</h3>
          <h3>To: [user2]</h3>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            onChange={handleChange}
          />
          <textarea
            type="textarea"
            name="text"
            placeholder="White your message here"
            onChange={handleChange}
          />
          <button className="btn orange">Send</button>
        </form>
      </div>
    </div>
  );
}
