import { Suspense } from "react";
import { NotFound } from "../../../components/not-found";
import {
  ApiStatus,
  ErrorStatus,
  StatusApi,
  get_user,
} from "../../../utils/get_funtcions";
import { IUser, InfoUser } from "./components/info_user";

export default async function User({ params }: { params: { user: string } }) {
  const user: StatusApi<IUser> = await get_user(params.user);

  if (user === undefined || (user as ErrorStatus).error !== undefined)
    return <NotFound />;

  return (
    <Suspense>
      <InfoUser user={(user as ApiStatus<IUser>).success} />
    </Suspense>
  );
}
