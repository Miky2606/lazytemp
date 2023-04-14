"use client";

import Link from "next/link";
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiFillFileUnknown,
} from "react-icons/ai";
import { BiCoffeeTogo } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import { ILinks, IconProfile } from "./info_user";

export const LinksView = ({ links }: { links: ILinks[] }): JSX.Element => {
  return (
    <div className="flex flex-col gap-3">
      {links === undefined || links.length === 0 ? (
        <div className="text-black">No Links</div>
      ) : (
        <div>
          {links.map((e) => (
            <Link href={e.link} target="_blank" className="rounded">
              {getIcon(e.name)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const getIcon = (icon: IconProfile) => {
  if (icon === "facebook") return <BsFacebook />;
  if (icon === "github") return <AiFillGithub />;
  if (icon === "instagram") return <AiOutlineInstagram />;
  if (icon === "coffe") return <BiCoffeeTogo />;
  if (icon === "unknown") return <AiFillFileUnknown />;
};
