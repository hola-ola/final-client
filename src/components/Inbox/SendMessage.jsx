import * as CONSTS from "../../utils/consts";
import useForm from "../../hooks/useForm.js";
import "../../style/Button.css";
import * as MESSAGE_SERVICE from "../../services/message.service";

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
    MESSAGE_SERVICE.CONTACT_USER(user._id, accessToken)
      .then((response) => console.log(response), toggleSendMessage(false))
      .catch((err) => console.log(err));
  });

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="text"
        placeholder="Write your message"
        onChange={handleChange}
      />
      <button className="button sandybrown">Send!</button>
    </form>
  );
}
