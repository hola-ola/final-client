import React, { useEffect, useState } from "react";
import * as MESSAGE_SERVICE from "../../services/message.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

import useForm from "../../hooks/useForm";

export default function NewMessage() {
  const [newConversation, setNewConversation] = useState({
    user1: "",
    user2: "",
    subject: "",
    messages: [],
  });

  useEffect(() => {
    MESSAGE_SERVICE.NEW_CONVERSATION()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <h2>Send a message</h2>
        <form>
          <h3>To: [user]</h3>
          <input type="text" placeholder="Subject" />
          <textarea type="textarea" placeholder="White your message here" />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}
