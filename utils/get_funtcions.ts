import { cache } from "react";
import { IList } from "../components/template";
import { list, users } from "../fake";
import { IUser } from "../app/user/[user]/components/info_user";
import axios, { AxiosResponse } from "axios";

export interface ErrorStatus {
  error: string;
}
export interface ApiStatus<T> {
  success: T;
}

export type TempUser = {
  user: IList;
};

export type StatusApi<T> = ApiStatus<T> | ErrorStatus | undefined;

export const get_template = cache(
  async (temp: string): Promise<StatusApi<TempUser>> => {
    const url = process.env.API_URL as string;
    try {
      const data = await axios.get<StatusApi<TempUser>>(
        `${url}/template/${temp}`
      );

      return data.data;
    } catch (error) {
      if (error instanceof axios.AxiosError) console.log(error.message);
      console.log(error);
    }
  }
);

export const get_user = cache(
  async (user: string): Promise<StatusApi<{ user: IUser; id: string }>> => {
    const url = process.env.API_URL as string;
    try {
      const data = await axios.get<StatusApi<{ user: IUser; id: string }>>(
        `${url}/user/${user}`
      );

      return data.data;
    } catch (error) {
      if (error instanceof axios.AxiosError) console.log(error.message);
      console.log(error);
    }
  }
);
