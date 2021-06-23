import * as CONSTS from "../../utils/consts";
import useForm from "../../hooks/useForm.js";
import "../../style/Button.css";
import * as MESSAGE_SERVICE from "../../services/message.service";
import "./SendMessage.css";

export default function SendMessage(props) {
  const { user, authenticate, toggleSendMessage } = props;
  const usernameFromProps = props.match.params.username;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  const [
    form,
    handleChange,
    handleSubmit,
    inputProps,
    images,
    handleImageChange,
  ] = useForm();

  const onSubmit = handleSubmit((form) => {
    console.log("Time to send a message!");
    toggleSendMessage(false);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="send-message">
        <p>Your are sending a message to {usernameFromProps}</p>
        <textarea type="text" name="text" onChange={handleChange} />
        <button className="button sandybrown">Send!</button>
      </div>
    </form>
  );
}
