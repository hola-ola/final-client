import { useState } from "react";

export default function useForm(formObj) {
  const [form, setForm] = useState(formObj);

  function handleChange(e) {
    const { target } = e;
    console.log(target.type);

    if (target.type === "radio") {
      const isTrue = target.value === "true";
      return setForm({ ...form, [target.name]: isTrue });
    }

    if (target.type === "checkbox") {
      // Checking if this is a multiple choice in the form object
      if (Array.isArray(form[target.name])) {
        const alreadyExists = form[target.name].includes(target.value);
        // The item is not in the array yet and it is selected so we add it
        if (!alreadyExists && target.checked) {
          return setForm({
            ...form,
            [target.name]: [...form[target.name], target.value],
          });
        }
        // In case the element is in the array, we "unselect" it
        return setForm({
          ...form,
          [target.name]: form[target.name].filter((el) => el !== target.value),
        });
      }
      // Use case for checkbox with one option only
      if (target.checked === true) {
        return setForm({ ...form, [target.name]: target.value });
      }
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
