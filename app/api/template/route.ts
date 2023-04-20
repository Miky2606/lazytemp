// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextResponse } from "next/server";
import { IList } from "../../../components/template";
import {
  get_temp,
  get_templates_api,
  get_user_id,
  save_temp,
} from "../../../db/utils_db";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  let request = await req.json();
  const temp = request.temp as IList;

  if (temp === undefined)
    return NextResponse.json({
      error: "You Forget a data like user_id or user",
    });

  const { exist } = await get_user_id({ id: temp.user });
  if (!exist)
    return NextResponse.json({
      error: "User doesn't exist",
    });

  try {
    //see if the template exist in the db
    const get_template = await get_temp({ name: temp.name });

    if (get_template !== undefined)
      return NextResponse.json(
        { error: "Template exist" },
        {
          status: 200,
        }
      );

    //add to the database
    temp.id = nanoid(7);
    temp.date = new Date();
    save_temp(temp, temp.user);

    return NextResponse.json(
      { success: "Temp created" },
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Problems with the server" },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: Request) {
  try {
    const resp = await get_templates_api();

    if (resp === undefined || resp.length === 0)
      return NextResponse.json(
        {
          error: "Templates Empty",
        },
        { status: 200 }
      );

    return NextResponse.json(
      {
        success: resp,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: error,
      },
      { status: 500 }
    );
  }
}
