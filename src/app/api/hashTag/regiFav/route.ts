import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}

export const POST = async (req: Request, res: NextResponse) => {
  console.log("POST");

  try {
    const { userId, hashtagId } = await req.json();
    await main();
    const post = await prisma.userHashTag.create({
      data: { userId, hashtagId },
    });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
