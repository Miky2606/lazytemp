"use client";

import Link from "next/link";
import { SearchView } from "../app/components/search";

import { IoCloudDownloadSharp } from "react-icons/io5";
import { CodeView } from "./code";
import { useState } from "react";
import { searchContext } from "../context/context";

import { useOnSnapshotApi, useUser } from "../hooks/hooks";

import { get_template_all, get_user_id } from "../db/utils_db";
import { IUser } from "../app/user/[user]/components/info_user";

export interface IList {
  id: string;
  name: string;
  downloads: number;
  description: string;
  user: string;
  date: Date;
}

export const TemplateView = (): JSX.Element => {
  const { data: temp } = useOnSnapshotApi<IList>({
    collection: get_template_all,
  });

  if (temp === undefined || temp.length === 0) return <div>Not Template</div>;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3">
      <SearchView />
      <TemplateList template={temp} />
    </div>
  );
};

export const TemplateList = ({
  template,
}: {
  template: IList[];
}): JSX.Element => {
  const [slice, setSlice] = useState<number>(12);
  const { filter } = searchContext();

  if (filter(template) === undefined || filter(template).length === 0)
    return <div className="text-black">Not Found</div>;

  return (
    <div className=" w-full  flex flex-col items-center gap-4">
      <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-3 p-2">
        {filter(template)
          .slice(0, slice)
          .map((e) => (
            <ItemsList {...e} key={e.id} />
          ))}
      </div>

      {filter(template).length > slice ? (
        <button
          className="bg-slate-700  p-2 rounded-full hover:bg-opacity-70 text-white"
          onClick={() => {
            setSlice((prev) => prev + 10);
          }}
        >
          Show more
        </button>
      ) : null}
    </div>
  );
};

const ItemsList = (items: IList): JSX.Element => {
  const { user } = useUser({ id: items.user });

  const short_description = (text: string): string => {
    return `${text.slice(0, 20)} ...`;
  };

  return (
    <div className=" shadow-md  w-full  shadow-slate-500 p-5 rounded flex flex-col gap-3 items-center  ">
      <div className="flex flex-col ">
        <h2>{items.name}</h2>
        <p className="flex gap-3 items-center ">
          {user?.name !== undefined ? (
            <Link
              href={`/user/${user.name}`}
              className="text-sm hover:text-blue-500"
            >
              {user.name}
            </Link>
          ) : null}
          <IoCloudDownloadSharp className="text-green-700" /> {items.downloads}
        </p>
      </div>
      <CodeView text={`temp --d ${items.name.toLowerCase()}`} />
      <p className=" p-2 text-sm">
        {items.description === ""
          ? "No Description"
          : short_description(items.description)}
      </p>

      <Link
        href={`/template/${items.name.toLowerCase().replace(" ", "-")}`}
        className="bg-slate-600 text-white px-2 p-1 rounded hover:opacity-70 "
      >
        See Template
      </Link>
    </div>
  );
};
