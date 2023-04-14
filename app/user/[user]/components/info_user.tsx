import Image from "next/image";
import { IList, TemplateList } from "../../../../components/template";

import { LinksView } from "./link";

export type IconProfile =
  | "instagram"
  | "github"
  | "facebook"
  | "twitter"
  | "unknown"
  | "coffe";

export interface IUser {
  id: string;
  email: string;
  name: string;
  image: string;
  expires: string;
  code_auth: string;
  links: ILinks[];
  template: IList[];
}

export interface ILinks {
  name: IconProfile;
  link: string;
}

export const InfoUser = ({
  user,
}: {
  user: IUser | undefined;
}): JSX.Element => {
  if (user === undefined) return <>User Not Founds</>;
  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
      <Image
        src={user.image}
        alt={user.name}
        width={200}
        height={200}
        className="rounded-full border-2 border-slate-700"
      />
      <p>{user.name}</p>
      <LinksView links={user.links} />
      {user.template === undefined || user.template.length === 0 ? (
        <div>Not Template</div>
      ) : (
        <TemplateList template={user.template} />
      )}
    </div>
  );
};
