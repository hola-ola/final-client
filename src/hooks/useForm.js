import { useState } from "react";

export default function useForm(formObj) {
  const [form, setForm] = useState(formObj);

  function handleChange(e) {
    const { target } = e;
    if (target.type === "radio") {
      const isTrue = target.value === "true";
      return setForm({ ...form, [target.name]: isTrue });
    }

    if (target.type === "checkbox" && target.checked === "true") {
      return setForm({
        ...form,
        [target.name]: [Object.values(target.name)].push(target.value),
      });
    }

    setForm({ ...form, [target.name]: target.value });
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
