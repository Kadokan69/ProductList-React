import { HugeiconsIcon } from "@hugeicons/react";
import { Delete03Icon, Edit02Icon, FavouriteIcon } from "@hugeicons/core-free-icons";
import { addLike, deleteProduct, editProduct, type IProduct } from "../../slices/productSlice";
import { useAppDispatch } from "../../store/hook";
import { useState, type ChangeEvent, type FC } from "react";

export const CardDetails: FC<IProduct> = ({ title, summary, like, id, image_url }) => {
  const [edit, setEdit] = useState(false);
  const [editPost, setEditPost] = useState({
    id,
    title: title,
    summary: summary,
    image_url: image_url,
    like,
  });
  const dispatch = useAppDispatch();

  const hendlerChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditPost({
      ...editPost,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <article
      className={"flex flex-col text-start gap-5 p-5 pr-8 bg-gray-700 rounded-2xl justify-between relative  h-[100%]"}
    >
      <HugeiconsIcon
        icon={Delete03Icon}
        size={24}
        color="currentColor"
        strokeWidth={1.5}
        className=" absolute top-2 right-2 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(deleteProduct(id));
        }}
      />
      {edit ? (
        <>
          <input
            type="text"
            name="image_url"
            className="border-1 p-1"
            value={editPost.image_url}
            onChange={hendlerChange}
          />
          <input
            type="text"
            name="title"
            className=" font-bold border-1 p-1"
            value={editPost.title}
            onChange={hendlerChange}
          />
          <textarea className="border-1 p-1" name="body" value={editPost.summary} onChange={hendlerChange} />
          <button
            onClick={() => {
              dispatch(editProduct({ ...editPost }));
              setEdit(!edit);
            }}
            type="submit"
            className="flex-1 py-2 px-4 border border-transparent rounded-md focus:outline-none"
          >
            Сохранить
          </button>
        </>
      ) : (
        <>
          <div
            className="w-full flex items-center justify-center rounded-xl bg-gray-800 overflow-hidden"
            style={{ maxHeight: 400 }}
          >
            <img
              src={image_url}
              alt={title}
              loading="lazy"
              className="w-full h-auto max-h-[400px] object-cover"
              width={600}
              height={400}
            />
          </div>
          <h2 className=" font-bold">{title}</h2>
          <p className="">{summary}</p>
        </>
      )}

      <div className="flex justify-end gap-3">
        <HugeiconsIcon
          icon={Edit02Icon}
          size={24}
          color="#ffffff"
          strokeWidth={1.5}
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setEdit(!edit);
          }}
        />
        <HugeiconsIcon
          icon={FavouriteIcon}
          size={24}
          color={like ? "#d0021b" : "currentColor"}
          strokeWidth={1.5}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(addLike(id));
          }}
          className="cursor-pointer"
        />
      </div>
    </article>
  );
};
