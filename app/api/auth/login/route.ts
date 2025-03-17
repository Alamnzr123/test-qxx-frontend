import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "../../../lib/utils";

export async function POST(req: NextRequest) {
  const { email, password } : any= await req.json();

  if (email && password === "") {
    return NextResponse.json({ message: "Email and password are required" });
  }else if (email === "testuser" && password === "testpass"){
    const token = await generateToken({ email: "testuser", password: "testpass" });
    const response = NextResponse.json({ message: "Login successful" });
    console.log(response);
    
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 3, // 3 days
      sameSite: "strict",
      path: "/",
    });
    return response;
  }
  else{
    return NextResponse.json({ message: "Data Error." });
  }

}