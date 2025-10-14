import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json({ success: true, message: "OTP sent to email" });
}
