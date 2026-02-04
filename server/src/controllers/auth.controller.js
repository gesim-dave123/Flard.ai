import prisma from "../lib/prisma.ts";
import bycrypt from "bcryptjs";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Basic Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing!",
      });
    }

    // 2. Database Fetch
    // Added sasStaffId and role to the select so they aren't undefined
    const user = await prisma.user.findFirst({
      where: { username, isActive: true },
      select: {
        id: true,
        username: true,
        hashedPassword: true,
        role: true,
      },
    });

    // 3. Check if user exists
    if (!user) {
      console.log("User not found for username:", username);
      return res.status(404).json({
        success: false,
        message: "Account not found!",
      });
    }

    // 4. Check Password
    const isMatch = await bycrypt.compare(password, user.hashedPassword);
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
        username: user.userName,
        role: user.role,
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
