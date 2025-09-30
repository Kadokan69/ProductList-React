import { useState } from "react";
import { CreateProduct } from "../components/CreateProduct/CreateProduct";
import { useAppDispatch } from "../store/hook";
import { useNavigate } from "react-router-dom";
import { addNewPost } from "../slices/productSlice";

export const CreateProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    title: "",
    body: "",
    image_url: "",
  });

  const [errorInput, setErrorInput] = useState({
    title: "",
    body: "",
    image_url: "",
  });

  const MAX_TITLE_LENGTH = 100;
  const MAX_BODY_LENGTH = 500;

  const validateForm = () => {
    const newErrors = {
      title: "",
      body: "",
      image_url: "",
    };

    if (!formValue.image_url.trim()) {
      newErrors.image_url = "URL изображения обязателен для заполнения";
    } else if( !/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(formValue.image_url) ) {
      newErrors.image_url = "Введите корректный URL изображения ";
    }

    if (!formValue.title.trim()) {
      newErrors.title = "Заголовок обязателен для заполнения";
    } else if (formValue.title.length > MAX_TITLE_LENGTH) {
      newErrors.title = `Заголовок не должен превышать ${MAX_TITLE_LENGTH} символов`;
    }

    if (!formValue.body.trim()) {
      newErrors.body = "Описание обязательно для заполнения";
    } else if (formValue.body.length > MAX_BODY_LENGTH) {
      newErrors.body = `Описание не должно превышать ${MAX_BODY_LENGTH} символов`;
    }

    setErrorInput(newErrors);
    return !newErrors.title && !newErrors.body && !newErrors.image_url;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    dispatch(addNewPost(formValue));
    setFormValue({
      title: "",
      body: "",
      image_url: "",
    });
    navigate("/products");
  };

  return (
    <CreateProduct
      onSubmit={handleSubmit}
      formValue={formValue}
      errorInput={errorInput}
      onInputChange={handleInputChange}
      maxTitle={MAX_TITLE_LENGTH}
      maxBody={MAX_BODY_LENGTH}
    />
  );
};
