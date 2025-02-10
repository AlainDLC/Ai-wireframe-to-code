import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { usersTable, WireFrameTable } from "@/configs/schema";

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

// } catch (e) {
//     return NextResponse.json(e)
// }
