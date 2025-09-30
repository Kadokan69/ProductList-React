import type { FC } from "react";

interface ISortFilter {
  setSortItem: (value: string) => void;
}

export const SortFilter: FC<ISortFilter> = ({ setSortItem }) => {
  return (
    <div className="flex p-2 mx-0 my-auto">
      <select
        name="sort"
        onChange={(e) => setSortItem(e.target.value)}
        className="border-1 p-2 rounded-md cursor-pointer focus:outline-0"
      >
        <option value="default">-- Сортировать --</option>
        <option value="asc">от А до Я</option>
        <option value="desc">от Я до А</option>
      </select>
    </div>
  );
};
