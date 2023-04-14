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

export function useOnSnapshotApi({
  collection,
}: {
  collection: CollectionReference<DocumentData> | Query<DocumentData>;
}) {
  const [template, setTemplate] = useState<IList[]>([]);
  useEffect(() => {
    const resp = onSnapshot(collection, (query) => {
      setTemplate(query.docs.map((map) => ({ ...map.data() })) as IList[]);
    });

    return resp;
  }, []);

  return { template };
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

export function useModal(open: string) {
  const [modal, openModal] = useState<string>(open);

  return { modal, openModal };
}
