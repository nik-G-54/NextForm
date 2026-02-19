import { connect } from "@/src/dbConfig/dbconfig";
import User from "@/src/models/usermodel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { token } = reqbody;

    if (!token) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid token or expired" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "User verified successfully"
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
