import { NextResponse } from "next/server";
import { get_user_code, get_user_db } from "../../../../../db/utils_db";

export async function GET(req: Request, params: { params: { id: string } }) {
  try {
    const user = await get_user_code(params.params.id);

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
      success: { user: user.data(), id: user.id },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Problems with the server" },
      {
        status: 500,
      }
    );
  }
}
