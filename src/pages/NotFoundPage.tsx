import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center  gap-5">
        <h1>Страница не найдена</h1>
        <Link to="/" className="underline rounded-md p-2">
          На главную
        </Link>
      </div>
    </>
  );
};
