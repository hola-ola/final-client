import { useState } from "react";

export default function useForm(formObj) {
  const [form, setForm] = useState(formObj);
  const [images, setImages] = useState([]);

  function handleChange(e) {
    const { target } = e;

    if (target.type === "file") {
      console.log(target.files[0].name);
    }

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
      return setForm({
        ...form,
        [target.name]: target.checked ? target.value : "",
      });
    }

    setForm({
      ...form,
      [target.name]: target.type === "number" ? +target.value : target.value,
    });
  }

  // fn -> stands for function. We cant write function, because its a reserved keyword
  function handleSubmit(fn) {
    return (event) => {
      event.preventDefault();
      fn(form, images);
    };
  }

  function inputProps(name, obj = {}) {
    const { value = form[name], type = "text", checked, item } = obj; //optional values

    const checkedVal =
      typeof checked != "undefined"
        ? checked
        : Array.isArray(form[name])
        ? form[name].includes(item)
        : item === form[name];

    return {
      name: name,
      value,
      onChange: handleChange,
      handleChange: handleChange, // this is here, because in the functional compoenents you are expecting a `handleChange` prop. If we change it to onChange, we can delete this line
      type,
      checked: checkedVal,
      item,
    };
  }

  function handleImageChange() {}

  //receives window.FormData();
  //axios call to a generic endpoint for image handling
  //service for image upload
  //after .then setImages() with res from axios
  function submitImages() {}

  return [
    form,
    handleChange,
    handleSubmit,
    inputProps,
    images,
    handleImageChange,
    submitImages,
  ];
}

// if (target.type === file) {
//   const formBody = new window.FormData();
//   formBody.append("imagesGallery": ...form[target.name])
// }

//call - on the frontend
// axios.post(`${process.env.REACT_APP_SERVER_URL}/uploadPicture/:listingId`, picture).then().catch()
//add authorization headers

//route - on the backend
// router.post("/uploadPicture/:listingId", upload.single("imagesGallery") (req, res) => {
//update the listing
// });
