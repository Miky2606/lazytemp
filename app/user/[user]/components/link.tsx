"use client";

import Link from "next/link";
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiFillFileUnknown,
  AiFillCheckCircle,
  AiFillTwitterCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { BiCoffeeTogo } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import { ILinks, IUser, IconProfile } from "./info_user";
import { LegacyRef, MutableRefObject, useRef, useState } from "react";
import { toast } from "react-toastify";
import { get_user_collection, set_links } from "../../../../db/utils_db";
import { useOnSnapshotApi, useUser } from "../../../../hooks/hooks";
import { collection } from "firebase/firestore";

interface IconsUI {
  icons: IconProfile;
  color: string;
}

const iconsGet: IconsUI[] = [
  {
    icons: "github",
    color: "text-green-400",
  },
  {
    icons: "instagram",
    color: "text-pink-600",
  },
  {
    icons: "coffe",
    color: "text-yellow-400",
  },
  {
    icons: "facebook",
    color: "text-blue-600",
  },
  {
    icons: "twitter",
    color: "text-blue-400",
  },
  {
    icons: "unknown",
    color: "text-gary-400",
  },
];

export const LinksView = ({
  links,
  id,
}: {
  links: ILinks[];
  id: string | undefined;
}): JSX.Element => {
  const { data } = useOnSnapshotApi<IUser>({ collection: get_user_collection });
  return (
    <div className="flex flex-col gap-3">
      {links === undefined || links.length === 0 ? (
        <div className="text-black">No Links</div>
      ) : (
        <div className="flex gap-3">
          <p>Your Links:</p>
          {data[0]?.links.map((e, i) => (
            <Link href={e.link} target="_blank" className="rounded" key={i}>
              {getIcon(e.name)}
            </Link>
          ))}
        </div>
      )}
      <ActionLink id={id} />
    </div>
  );
};

export const ActionLink = ({ id }: { id: string | undefined }): JSX.Element => {
  const link = useRef<HTMLInputElement>(null);
  const [activeIcon, setActiveIcon] = useState<IconProfile | undefined>(
    undefined
  );
  const addLink = async () => {
    var r = /^(ftp|http|https):\/\/[^ "]+$/;

    if (link.current?.value === undefined || !r.test(link.current.value))
      return toast.error("Link must be validate");

    const links_send: ILinks = {
      name: activeIcon as IconProfile,
      link: link.current.value,
    };

    try {
      set_links(links_send, id);
    } catch (error) {
      return toast.error(`Error saving the link`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 text-center ">
        <p>Add Links</p>
        {iconsGet.map((e, i) => (
          <div
            key={i}
            onClick={() => setActiveIcon(e.icons)}
            className={`${activeIcon === e.icons ? e.color : ""}`}
          >
            {getIcon(e.icons)}
          </div>
        ))}
      </div>

      {activeIcon === undefined ? null : (
        <div className="flex gap-3">
          <input
            ref={link}
            type="text"
            placeholder="Add link"
            className="focus:outline-none p-1 border-[0.5px] border-green-400 rounded"
          />
          <button
            className="bg-green-400 p-2 rounded text-white hover:bg-green-600 "
            onClick={addLink}
          >
            <AiFillCheckCircle className="text-2xl" />
          </button>

          <button
            className="bg-red-400 p-2 rounded text-white hover:bg-red-600 "
            onClick={() => setActiveIcon(undefined)}
          >
            <AiFillCloseCircle className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export const getIcon = (icon: IconProfile) => {
  if (icon === "facebook")
    return (
      <BsFacebook className="text-2xl hover:text-blue-600 cursor-pointer" />
    );
  if (icon === "github")
    return (
      <AiFillGithub className="text-2xl hover:text-green-400 cursor-pointer" />
    );
  if (icon === "instagram")
    return (
      <AiOutlineInstagram className="text-2xl hover:text-pink-600 cursor-pointer" />
    );
  if (icon === "coffe")
    return (
      <BiCoffeeTogo className="text-2xl hover:text-yellow-400 cursor-pointer" />
    );
  if (icon === "twitter")
    return (
      <AiFillTwitterCircle className="text-2xl hover:text-blue-400 cursor-pointer" />
    );
  return (
    <AiFillFileUnknown className="text-2xl hover:text-gray-400 cursor-pointer" />
  );
};
