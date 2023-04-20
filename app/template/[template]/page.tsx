import { Suspense } from "react";
import { IList } from "../../../components/template";
import {
  ApiStatus,
  ErrorStatus,
  StatusApi,
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
  const temp: StatusApi<IList> = await get_template(
    params.template.replace("-", " ")
  );

  if (temp === undefined || (temp as ErrorStatus).error !== undefined)
    return <NotFound />;

  return (
    <div className="text-black">
      <Suspense fallback={<LoadingView />}>
        <Info temp={(temp as ApiStatus<IList>).success} />
      </Suspense>
    </div>
  );
}
