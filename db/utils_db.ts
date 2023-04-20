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
import { ILinks, IUser } from "../app/user/[user]/components/info_user";
import { toast } from "react-toastify";

export const get_template_all = query(
  collection(db, "temp"),
  orderBy("date", "desc")
);

export const get_user_collection = collection(db, "users");

export const related = (name: string, user: string) => {
  return query(collection(db, "temp"), where("user", "==", user.trim()));
};

//save list in firebase
export const save_temp = async (temp: IList, user: string) => {
  const docref = doc(db, "users", user);

  await addDoc(collection(db, "temp"), temp);
  await updateDoc(docref, { template: arrayUnion(temp) });
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

  return { user: resp.docs[0], id: resp.docs[0].id };
};

//get user by id for some case
export const get_user_id = async ({ id }: { id: string }) => {
  const docref = doc(db, "users", id.trim());

  const resp = await getDoc(docref);

  return { exist: resp.exists(), data: resp.data() };
};

//set links profile

export const set_links = async (links: ILinks, user: string | undefined) => {
  if (user === undefined) throw new Error("Id user undefined");
  const docref = await doc(db, "users", user);

  const user_get = (await getDoc(docref)).data() as IUser;
  const find = user_get.links.find((e) => e.name === links.name);
  if (user_get.links.length > 7)
    return toast.error("You have the max of the links permitted");

  if (find !== undefined) return toast.error("Link Exist");

  const update = await updateDoc(docref, { links: arrayUnion(links) });
};

//get user by the code auth for cli

export const get_user_code = async (code: string) => {
  const resp = await getDocs(
    query(collection(db, "users"), where("code_auth", "==", code))
  );

  return resp.docs[0];
};

//update the downloads
export const update_downloads = async (id: string) => {
  const docref = await get_temp({ name: id });
  const update_down = (docref.data() as IList).downloads;
  console.log(update_down);
  const update = await updateDoc(docref.ref, {
    downloads: update_down + 1,
  });
};
