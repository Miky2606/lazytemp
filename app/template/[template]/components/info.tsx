"use client";

import { CodeView } from "../../../../components/code";
import { IList, TemplateList } from "../../../../components/template";

import Link from "next/link";
import { useOnSnapshotApi, useUser } from "../../../../hooks/hooks";

import { related } from "../../../../db/utils_db";
import { TempUser } from "../../../../utils/get_funtcions";

export const Info = ({ temp }: { temp: TempUser }): JSX.Element => {
  const { user } = useUser({ id: temp.user.user });

  return (
    <div className="flex items-center  flex-col gap-3 p-3 w-full h-full">
      <h2 className="text-2xl">{temp.user.name}</h2>
      <Link
        href={`/user/${user?.name}`}
        className="text-blue-500 hover:text-opacity-50"
      >
        {user?.name}
      </Link>
      <p>Downloads: {temp.user.downloads}</p>
      <CodeView text={`temp -d ${temp.user.name.toLocaleLowerCase()}`} />

      <div className="w-full lg:w-1/2 h-[10vh]  shadow-md shadow-slate-700 rounded p-2">
        <DescriptionView description={temp.user.description} />
      </div>

      <div className="w-full flex flex-col gap-5 ">
        <h2 className="text-center text-2xl">Other Template of this user</h2>
        <Related name={temp.user.name} user={temp.user.user} />
      </div>
    </div>
  );
};

const DescriptionView = ({
  description,
}: {
  description: string;
}): JSX.Element => {
  if (description === undefined || description === "")
    return <p className="text-center">No Description</p>;

  return <p>{description}</p>;
};

const Related = ({ name, user }: { name: string; user: string }) => {
  const { data: template } = useOnSnapshotApi<IList>({
    collection: related(name, user),
  });
  const new_template = template.filter((e) => e.name !== name);
  if (template === undefined || template.length === 0)
    return <p>Not Related Templates</p>;

  return (
    <div className="w-full ">
      <TemplateList template={new_template} />
    </div>
  );
};
