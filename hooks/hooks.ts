import { useEffect, useState } from "react";
import { IList } from "../components/template";
import {
  onSnapshot,
  CollectionReference,
  DocumentData,
  Query,
} from "firebase/firestore";
import { IUser } from "../app/user/[user]/components/info_user";
import { get_user_id } from "../db/utils_db";

export function useOnSnapshotApi<T>({
  collection,
}: {
  collection: CollectionReference<DocumentData> | Query<DocumentData>;
}) {
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    const resp = onSnapshot(collection, (query) => {
      setData(query.docs.map((map) => ({ ...map.data() })) as T[]);
    });

    return resp;
  }, []);

  return { data };
}

export function useUser({ id }: { id: string }) {
  const [user, setUser] = useState<IUser>();
  const user_data = async () => {
    const { data } = await get_user_id({ id: id });

    setUser(data as IUser);
  };
  useEffect(() => {
    user_data();
  }, []);

  return { user };
}
