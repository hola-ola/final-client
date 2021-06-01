import { useState } from "react";

export default function useForm(formObj) {
  const [form, setForm] = useState(formObj);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // fn -> stands for function. We cant write function, because its a reserved keyword
  function handleSubmit(fn) {
    return (event) => {
      event.preventDefault();
      fn(form);
    };
  }

  return [form, handleChange, handleSubmit];
}
