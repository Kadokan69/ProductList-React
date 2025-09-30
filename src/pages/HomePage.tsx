import type { FC } from "react"
import { Link } from "react-router-dom"
import type { IHeader } from "../components/Header/Header"

export const HomePage: FC<{ links: IHeader[] }> = ({links}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 text-center">
      <h1>Главная страница</h1>
      <nav>
        <ul>
          {links.map(link => (
            <li key={link.url}>
              <Link to={link.url} className="underline">{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
    