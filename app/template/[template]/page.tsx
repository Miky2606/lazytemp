import { Suspense } from "react";
import { IList } from "../../../components/template";
import {
  ApiStatus,
  ErrorStatus,
  StatusApi,
  TempUser,
  get_template,
} from "../../../utils/get_funtcions";
import { Info } from "./components/info";
import { LoadingView } from "../../../components/loading";
import { NotFound } from "../../../components/not-found";

export default async function Template({
  params,
}: {
  params: { template: string };
}) {
  const temp: StatusApi<TempUser> = await get_template(params.template);

  if (temp === undefined || (temp as ErrorStatus).error !== undefined)
    return <NotFound />;

  return (
    <div className="text-black">
      <Suspense fallback={<LoadingView />}>
        <Info temp={(temp as ApiStatus<TempUser>).success} />
      </Suspense>
    </div>
  );
}
