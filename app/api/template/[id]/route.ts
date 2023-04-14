import { NextResponse } from "next/server";
import { get_temp } from "../../../../db/utils_db";

export async function GET(req: Request, param: { params: { id: string } }) {
  try {
    const resp = await get_temp({ name: param.params.id });
    if (resp === undefined)
      return NextResponse.json(
        {
          error: "Template not found",
        },
        { status: 400 }
      );

    return NextResponse.json(
      {
        success: resp.data(),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Problem with Server",
      },
      { status: 500 }
    );
  }
}
