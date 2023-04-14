import { NextResponse } from "next/server";
import { get_user_db } from "../../../../db/utils_db";

export async function GET(req: Request, params: { params: { user: string } }) {
  try {
    const user = await get_user_db({ name: params.params.user });

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
      { error: "Problems with the server" },
      {
        status: 500,
      }
    );
  }
}
