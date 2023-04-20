import { NextResponse } from "next/server";
import { get_user_code } from "../../../db/utils_db";
import { headers } from "next/headers";

export async function GET(req: Request) {
  const header = headers();

  try {
    const user = await get_user_code(header.get("code") as string);

    if (user === undefined)
      return NextResponse.json(
        {
          error: "User doesn't exist",
        },
        {
          status: 200,
        }
      );

    return NextResponse.json({
      success: user.data(),
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Problems with the server" + error },
      {
        status: 500,
      }
    );
  }
}
