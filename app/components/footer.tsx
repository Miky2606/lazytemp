"use client";
import { ILinks } from "../user/[user]/components/info_user";
import { Logo } from "./logo";
import { name } from "commander";
import Link from "next/link";
import { getIcon } from "../user/[user]/components/link";
const my_links: ILinks[] = [
  {
    name: "github",
    link: "https://github.com/Miky2606",
  },
  {
    name: "coffe",
    link: "https://www.buymeacoffee.com/miky2606",
  },
];

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4  border-t  shadow md:flex md:items-center md:justify-between md:p-6 bg-gray-800 border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 flex items-center gap-2">
        <Logo /> © 2023
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 gap-3">
        {my_links.map((e, i) => (
          <Link href={e.link} target="_blank" className="rounded" key={i}>
            {getIcon(e.name)}
          </Link>
        ))}
      </ul>
    </footer>
  );
};
