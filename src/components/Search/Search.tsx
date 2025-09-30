import { useState, type ChangeEvent, type FC } from "react";

interface ISearchProps {
  searchTerm: (searchTerm: string) => void;
  placeholder?: string;
}

export const Search: FC<ISearchProps> = ({ searchTerm, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    searchTerm(e.target.value);
  };

  return (
    <input
      className=" border-gray-500 border-1 w-full py-2 px-4 rounded-sm focus:outline-0 focus:border-gray-300"
      onChange={handlerChange}
      value={inputValue}
      placeholder={placeholder ? placeholder : "Serch"}
    ></input>
  );
};
