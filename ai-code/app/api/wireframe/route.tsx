import { NextRequest, NextResponse } from "next/server";

import { db } from "@/configs/db";
import { WireFrameTable } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { description, imageUrl, model, uid, email } = await req.json();

  const result = await db
    .insert(WireFrameTable)
    .values({
      uid: uid,
      description: description,
      imageUrl: imageUrl,
      model: model,
      createdBy: email,
    })
    .returning({ id: WireFrameTable.id });

  return NextResponse.json(result);
}

export async function GET(req: NextResponse) {
  try {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const uid = searchParams?.get("uid");

    if (uid) {
      const result = await db
        .select()
        .from(WireFrameTable)
        .where(eq(WireFrameTable.uid, uid));

      return NextResponse.json(result[0]);
    }
    return NextResponse.json({ result: "No Record found" });
  } catch (err) {
    console.error(err);
  }
}

export async function PUT(req: NextResponse) {
  try {
    const { uid, codeResp } = await req.json();

    const result = await db
      .update(WireFrameTable)
      .set({
        code: codeResp,
      })
      .where(eq(WireFrameTable.uid, uid))
      .returning({ uid: WireFrameTable.uid });
    return NextResponse.json(result);
  } catch (err) {
    console.error("mishmatch", err);
  }
}
