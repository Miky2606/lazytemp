"use client";
import { useSession, signIn, signOut } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { IUser } from "../user/[user]/components/info_user";

export const NavbarView = (): JSX.Element => {
  const { data: session } = useSession();
  const user = session as IUser;

  return (
    <nav className="flex justify-between p-2  ">
      <div>Logo</div>
      <div>
        <ul className="flex justify-between gap-3">
          {!session ? (
            <button onClick={() => signIn()}>
              <li className="bg-slate-700 py-1 px-2 rounded-full hover:bg-opacity-70 text-white">
                Sign In
              </li>
            </button>
          ) : (
            <div className="flex gap-5 p-2">
              {user !== undefined ? (
                <Link href={`/user/${user.name}`}>
                  <Image
                    src={user.image as string}
                    alt={user.name as string}
                    width={30}
                    height={20}
                    loading="lazy"
                    className="rounded-full border-[0.5px] border-slate-700 border-dashed"
                  />
                </Link>
              ) : null}
              <button onClick={() => signOut()}>
                <li className="bg-slate-700 py-1 px-2 rounded-full hover:bg-opacity-70 text-white">
                  Log Out
                </li>
              </button>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};
