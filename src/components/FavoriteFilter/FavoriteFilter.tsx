import { type FC } from "react";

interface IFavoriteFilterProps {
  isFavorite: boolean;
  onFilterChange: (isFavorite: boolean) => void;
  favoriteCount: number;
}

export const FavoriteFilter: FC<IFavoriteFilterProps> = ({ isFavorite, onFilterChange, favoriteCount }) => {
  return (
    <div className="flex gap-5 p-5 justify-center">
      <button onClick={() => onFilterChange(false)} className={isFavorite ? "" : "border-1 !bg-[#364152] !important"}>
        Все карточки
      </button>
      <button
        onClick={() => onFilterChange(true)}
        className={`${!isFavorite ? "" : "border-1 !bg-[#364152]"} ${!favoriteCount ? " text-gray-600" : ""}`}
        disabled={!favoriteCount}
      >
        Избранные {favoriteCount}
      </button>
    </div>
  );
};
