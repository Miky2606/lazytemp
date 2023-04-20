import { NextResponse } from "next/server";
import { get_temp, update_downloads } from "../../../../db/utils_db";

export async function GET(req: Request, param: { params: { id: string } }) {
  console.log(param.params.id);
  try {
    const resp = await get_temp({ name: param.params.id });
    if (resp === undefined)
      return NextResponse.json(
        {
          error: "Template not found",
        },
        { status: 200 }
      );

    return NextResponse.json(
      {
        success: { user: resp.data(), id: resp.id },
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

export async function PUT(req: Request, param: { params: { id: string } }) {
  try {
    const resp = update_downloads(param.params.id);
    return NextResponse.json(
      {
        success: "Updated",
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
