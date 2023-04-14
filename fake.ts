import { IFiles } from "./app/template/[template]/components/info";
import { IUser } from "./app/user/[user]/components/info_user";
import { IList } from "./components/template";

export const list: IList[] = [
  {
    id: 1,
    name: "hola",
    user: "Jonathan",
    downloads: 5,
    description: "",
  },
  {
    id: 2,
    name: "React-20",
    user: "Jonathan",
    downloads: 5,
    description: "",
  },
  {
    id: 3,
    name: "React",
    user: "Jonathan",
    downloads: 5,
    description: "",
  },
  {
    id: 4,
    name: "React-50",
    user: "Jonathan",
    downloads: 5,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci deserunt eum sit est similique distinctio asperiores autem! Quo adipisci quia repellendus libero facere, aspernatur illo nulla, in animi aperiam minus!",
  },
  {
    id: 5,
    name: "React-50",
    user: "Jonathan",
    downloads: 5,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci deserunt eum sit est similique distinctio asperiores autem! Quo adipisci quia repellendus libero facere, aspernatur illo nulla, in animi aperiam minus!",
  },
];

export const files: IFiles[] = [
  {
    name: "commponent",
    type: "folder",
    subfolder: [
      {
        name: "New.tsx",
        type: "file",
        subfolder: [],
      },
    ],
  },
  {
    name: "commponent3",
    type: "folder",
    subfolder: [],
  },
  {
    name: "commponent.tsx",
    type: "file",
    subfolder: [],
  },
];

export const users: IUser[] = [
  {
    name: "Jonathan",
    image: "",
    template: list,
  },
  {
    name: "Pedro",
    image: "",
    template: list,
  },
];
