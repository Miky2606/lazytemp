import { IList } from "../components/template";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./db";

export const get_template_all = query(
  collection(db, "temp"),
  orderBy("date", "desc")
);

export const related = (name: string, user: string) => {
  return query(collection(db, "temp"), where("user", "==", user.trim()));
};

//save list in firebase
export const save_temp = async (temp: IList, user: string) => {
  const docref = doc(db, "users", user);

  await addDoc(collection(db, "temp"), temp);
  const update = await updateDoc(docref, { template: arrayUnion(temp) });
  console.log(update);
};

//get only one template by the name
export const get_temp = async ({ name }: { name: string }) => {
  const resp = await getDocs(
    query(collection(db, "temp"), where("name", "==", name))
  );

  return resp.docs[0];
};

//get all templates
export const get_templates_api = async () => {
  let docs: IList[] = [];
  const resp = await getDocs(get_template_all);
  resp.forEach((e) => docs.push(e.data() as IList));
  return docs;
};

//get any user
export const get_user_db = async ({ name }: { name: string }) => {
  const resp = await getDocs(
    query(collection(db, "users"), where("name", "==", name))
  );

  return resp.docs[0];
};

//get user by id for some case
export const get_user_id = async ({ id }: { id: string }) => {
  const docref = doc(db, "users", id.trim());

  const resp = await getDoc(docref);

  return { exist: resp.exists(), data: resp.data() };
};
