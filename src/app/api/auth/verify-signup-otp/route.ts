import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, otp } = await request.json();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (otp === "123456") {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 400 });
}
