import type { FC } from "react";
import { Link } from "react-router-dom";

export interface IHeader {
  title: string;
  url: string;
}

export const Header: FC<{ links: IHeader[] }> = ({ links }) => {
  return (
    <header className="flex items-start p-5">
      <ul className="flex gap-3">
        {links.map((item) => (
          <li key={item.title}>
            <Link to={item.url}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
};
