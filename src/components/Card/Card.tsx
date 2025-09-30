import type { FC } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete03Icon, FavouriteIcon } from "@hugeicons/core-free-icons";
import { addLike, deleteProduct, type IProduct } from "../../slices/productSlice";
import { useAppDispatch } from "../../store/hook";
import { Link, useLocation } from "react-router-dom";

export const Card: FC<IProduct> = ({ title, summary, like, id, image_url }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isProductsPage = location.pathname.includes("/products");
  const productLink = isProductsPage ? `./${id}` : `/products/${id}`;

  return (
    <article>
      <Link
        to={productLink}
        className={
          "flex flex-col h-full min-h-[220px] text-start gap-5 p-5 pr-8 bg-gray-700 rounded-2xl justify-between hover:scale-101 cursor-pointer relative"
        }
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
        <div
          className="w-full h-[200px] flex items-center justify-center overflow-hidden rounded-xl bg-gray-800"
          style={{ minHeight: 200, maxHeight: 200 }}
        >
          <img
            src={image_url}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
            width={300}
            height={200}
          />
        </div>
        <h2 className=" font-bold min-h-[48px]">{title}</h2>
        <p className="line-clamp-3">{summary}</p>
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
          className=" self-end cursor-pointer"
        />
      </Link>
    </article>
  );
};
