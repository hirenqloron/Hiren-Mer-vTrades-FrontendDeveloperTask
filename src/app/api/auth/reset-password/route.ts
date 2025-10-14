import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json({ success: true, message: "Password updated" });
}