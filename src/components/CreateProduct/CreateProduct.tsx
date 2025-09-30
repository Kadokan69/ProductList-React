import type { FC } from "react";

interface ICreateProductProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formValue: {
    title: string;
    body: string;
    image_url: string;
  };
  errorInput: {
    title: string;
    body: string;
    image_url: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  maxTitle: number;
  maxBody: number;
}

export const CreateProduct: FC<ICreateProductProps> = ({
  onSubmit,
  formValue,
  errorInput,
  onInputChange,
  maxTitle,
  maxBody,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#364153] rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Создать новый пост</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium mb-2">
            URL изображения *
          </label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formValue.image_url}
            onChange={onInputChange}
            placeholder="Введите URL изображения"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none  focus:border-blue-300 ${
              errorInput.image_url ? "border-red-500" : "border-gray-300"
            }`}
          />
          <div className="flex justify-between mt-1">
            {errorInput.image_url && <p className="text-red-500 text-sm">{errorInput.image_url}</p>}
          </div>
        </div>
        <div className="m-0">
          <label htmlFor="title" className="block text-sm font-medium  mb-2">
            Заголовок *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formValue.title}
            onChange={onInputChange}
            placeholder="Введите заголовок поста"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none  focus:border-blue-300 ${
              errorInput.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          <div className="flex justify-between mt-1">
            {errorInput.title && <p className="text-red-500 text-sm">{errorInput.title}</p>}
            <span className={`text-sm ml-auto ${formValue.title.length > maxTitle ? "text-red-500" : "text-gray-500"}`}>
              {formValue.title.length}/{maxTitle}
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium mb-2">
            Текст поста *
          </label>
          <textarea
            id="body"
            name="body"
            value={formValue.body}
            onChange={onInputChange}
            rows={6}
            placeholder="Напишите содержание вашего поста..."
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-300 resize-none ${
              errorInput.body ? "border-red-500" : "border-gray-300"
            }`}
          />
          <div className="flex justify-between mt-1">
            {errorInput.body && <p className="text-red-500 text-sm">{errorInput.body}</p>}
            <span className={`text-sm ml-auto ${formValue.body.length > maxBody ? "text-red-500" : "text-gray-500"}`}>
              {formValue.body.length}/{maxBody}
            </span>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Создать пост
          </button>
        </div>
      </form>
    </div>
  );
};
