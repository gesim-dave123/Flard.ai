import prisma from "../lib/prisma.ts";
import bycrypt from "bcryptjs";

export const loginUser = async (req, res) => {
  try {
    // 1. Basic Validation
    const { userName, password } = req.body;

    if (!userName || !password) {
      console.log("Validated");
      return res.status(400).json({
        success: false,
        message: "Required fields are missing!",
      });
    }
    const user = await prisma.user.findFirst({
      where: { userName, isActive: true },
      select: {
        id: true,
        userName: true,
        password: true,
      },
    });

    // 3. Check if user exists
    if (!user) {
      console.log("User not found for userName:", userName);
      return res.status(404).json({
        success: false,
        message: "Account not found!",
      });
    }

    // 4. Check Password
    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // 5. Simplified Response (No cookies, no JWT)
    return res.status(200).json({
      success: true,
      message: "Login Successful (No token generated)",
      user: {
        id: user.id,
        userName: user.userName,
      },
    });
  } catch (err) {
    console.error("Server-side Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message, // Useful for debugging during dev
    });
  }
};
