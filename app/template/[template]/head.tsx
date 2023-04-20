import { IList } from "../../../components/template";
import {
  ApiStatus,
  ErrorStatus,
  StatusApi,
  get_template,
} from "../../../utils/get_funtcions";

export default async function Head({
  params,
}: {
  params: { template: string };
}) {
  const description: StatusApi<IList> = await get_template(params.template);
  if (description === undefined || (description as ErrorStatus).error)
    return <title>Not Found</title>;

  return (
    <>
      <title>{params.template}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content={
          (description as ApiStatus<IList>).success.description !== ""
            ? (description as ApiStatus<IList>).success.description
            : "No description"
        }
      />
      <meta lang="en" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
